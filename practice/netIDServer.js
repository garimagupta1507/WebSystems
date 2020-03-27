const express = require('express');
const app = express();

app.get('/netID', function (requset, response) {
    let datetime = new Date();
    let name = 'Name: Garima Gupta'
    let netId='NetID: mm6326'
    response.send(`${name}, ${netId}`);
});

port = 5150; // Or anything you'd like
host = '127.0.0.10'; // Any loopback address

app.listen(port, host, function () {
console.log(`Name and netID app listening on IPv4: ${host}:${port}`);
});
