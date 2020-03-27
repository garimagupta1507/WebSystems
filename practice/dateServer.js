const express = require('express');
const app = express();

port = 7576; // Or anything you'd like
host = '127.0.0.8'; // Any loopback address

app.listen(port, host, function () {
console.log(`Date and Time app listening on IPv4: ${host}:${port}`);
});

app.get('/date', function (request, response) {
    let datetime = new Date();
    response.send(`Date and Time: ${new Date()}`);
});
