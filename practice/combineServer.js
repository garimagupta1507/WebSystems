const express = require('express');
const app = express();

port = 5150; // Or anything you'd like
host = '127.0.0.12'; // Any loopback address

app.listen(port, host, function () {
console.log(`combine server results: ${host}:${port}`);
});

app.get('/date', function (request, response) {
    let datetime = new Date();
    response.send(`Date and Time: ${new Date()}`);
});
app.get('/netID', function (request, response) {
    let datetime = new Date();
    let name = 'Name: Garima Gupta'
    let netId='NetID: mm6326'
    response.send(`${name}, ${netId}`);
});
