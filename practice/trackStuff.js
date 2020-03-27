const rp = require('request-promise-native');
var totalCount = 0;
let site1 = {
    uri: 'https://windsurf.grotto-networking.com/data/tracks/track_2016_10_11.json',
    method: 'GET', // What does this do?
    json: true
};


rp(site1).then(response => {
    totalCount = response.points.length;
    console.log(`The session lasted ${totalCount/60} minutes`);
    console.log(`The Start time of track_2016_10_11 was: ${response.start_time}`);
})
console.log("Starting my web requests:");
