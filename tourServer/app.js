var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var cookieParser = require('cookie-parser');

let tourDB = require('./tourDB');
let usersDB = require('./usersDB');

var app = express();

var app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cookieName = "he9684toursid";
app.use(session({
    secret: 'Garima Gupta',
    resave: false,
    saveUninitialized: false,
    name: cookieName
}));

const setUpSessionMiddleware = function (req, res, next) {
    if (!req.session.user) {
        req.session.user = { role: 'guest' };
    }
    next();
}

app.use(setUpSessionMiddleware);

var getTours = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var toursData = await tourDB.find({});
    res.json(toursData);
    res.status(200);
}

var getTourByID = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var tourID = req.params.id;
    console.log(tourID);
    var tour = await tourDB.find({ "_id": tourID });
    if (typeof (tour) != "undefined" && tour.length > 0) {
        res.status(200).json(tour);
    }
    else {
        res.status(404).json("Tour not found...");
    }
}

var getNumberOfTours = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var toursData = await tourDB.find({});
    res.json(toursData.length);
}

var addTours = async function (req, res) {
    var tour = req.body;
    var toursData = await tourDB.find({});

    if (typeof (tour) != "undefined") {
        addedTour = await tourDB.insert(tour);
        var resString = "Added Tour : " + JSON.stringify(tour);
        res.status(200).json(resString);
    }
    else {
        res.status(500).json("Tour data is undefined");
    }
}

var deleteTourByID = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var tourID = req.params.id;
    console.log(tourID);
    var deletedTour = await tourDB.remove({ _id: tourID }, {});
    console.log("Deleted Tour : ", deletedTour);
    if (deletedTour > 0) {
        res.status(200).json("Tour deleted successfully...");
    }
    else {
        res.status(404).json("Tour not deleted...");
    }
}

var doLogin = async function (req, res) {
    var loginData = req.body;
    var email = loginData.email;
    var password = loginData.password;
    var errorData = {
        "error": true,
        "message": "User/Password error"
    };
    var user;
    if (typeof (email) != "undefined" && typeof (password) != "undefined") {
        user = await usersDB.findOne({ email: email });
        if (!user) {
            res.status(404).json(JSON.stringify(errorData));
        }
        else {
            let verified = bcrypt.compareSync(password, user.password);
            if (verified) {
                var oldUserInfo = req.session.user;
                req.session.regenerate(function (err) {
                    if (err) {
                        console.log(err);
                    }

                    let newUserInfo = Object.assign(oldUserInfo, user);
                    delete newUserInfo.password;
                    req.session.user = newUserInfo;
                    res.status(200).json(newUserInfo);
                });
            }
            else {
                res.status(404).json(JSON.stringify(errorData));
            }
        }
    }
    else {
        resData = "Bad login data : StatusCodeError: 404 - " + JSON.stringify(errorData);
        res.status(404).json(resData);
    }
}

var doLogout = function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options);
        res.json({ message: 'GoodBye' });
    });
}

var checkAdmin = function (req, res, next) {
    var err = { "error": "Not Permitted" };
    if (req.session.user.role !== 'admin') {
        var errString = "StatusCodeError: 401 - " + JSON.stringify(err);
        res.json(errString);
    }
    else {
        next();
    }
}

var checkCustomer = function (req, res, next) {
    var err = { "error": "Not Permitted" };
    if (req.session.user.role !== 'customer') {
        var errString = "StatusCodeError: 401 - " + JSON.stringify(err);
        res.json(errString);
    }
    else {
        next();
    }
}

app.get('/tours', getTours);
app.get('/tours/:id', getTourByID);
app.get('/count/tour', getNumberOfTours);
app.post('/tours/add', checkAdmin, addTours);
app.delete('/tours/delete/:id', checkAdmin, deleteTourByID);
app.post('/login', express.json(), doLogin);
app.get('/logout', doLogout);

module.exports = app;
