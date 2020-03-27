const rp = require('request-promise-native');

let cookieJar = rp.jar();

let visitTour = {
  uri: 'http://127.0.0.14:5150/tours',
  method: 'GET',
  json: true,
  resolveWithFullResponse: true,
  jar: cookieJar
};

let logout = {
  uri: 'http://127.0.0.14:5150/logout',
  method: 'GET',
  jar: cookieJar
};

let site1 = {
  uri: 'http://127.0.0.14:5150/login',
  method: 'POST', // What does this do?
  body: {
    "email": "subopercle2002@yahoo.com",
    "password": "/27NT)Fc"
  },
  json: true,
  resolveWithFullResponse: true,
  jar: cookieJar
};

let site2 = {
  uri: 'http://127.0.0.14:5150/login',
  method: 'POST', // What does this do?
  body: {
    "email": "subopercle200@yahoo.com",
    "password": "/27NT)Fc"
  },
  json: true,
  resolveWithFullResponse: true,
  jar: cookieJar
};

let site3 = {
  uri: 'http://127.0.0.14:5150/login',
  method: 'POST', // What does this do?
  body: {
    "email": "subopercle2002@yahoo.com",
    "password": "/27NT)F"
  },
  json: true,
  resolveWithFullResponse: true,
  jar: cookieJar
};

async function doLogin() {
  console.log("Login test 1 : Good login");
  var tourData = await rp(visitTour);
  console.log("called tour, Cookies : " + cookieJar.getCookieString(visitTour.uri));
  var goodLogin = await rp(site1);
  console.log("Good login test result : ", goodLogin.body);
  console.log("\nAfter good login, Cookies : ", cookieJar.getCookieString(visitTour.uri));

  rp(logout);
  var tourData = await rp(visitTour);
  console.log("\nAfter logout, Cookies : ", cookieJar.getCookieString(logout.uri));

  console.log("\nLogin test 2: Bad Email");
  var tourData = await rp(visitTour);
  console.log("called tour, Cookies : " + cookieJar.getCookieString(visitTour.uri));
  var emailProblem = await rp(site2);
  console.log("Bad email login error : ", emailProblem.body);
  console.log("After login test 2, Cookies : ", cookieJar.getCookieString(visitTour.uri));

  console.log("\nLogin test 3: Bad password");
  var passwordProblem = await rp(site3);
  console.log("Bad password login error : ", passwordProblem.body);
  console.log("\nAfter login test 3, Cookies : ", cookieJar.getCookieString(visitTour.uri));
}

doLogin().catch(function (error) {
  console.log(error);
});
