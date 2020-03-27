const rp = require('request-promise-native');
//var totalCount = 0;
let site1 = {
    uri: 'http://127.0.0.14:5150/tours',
    method: 'GET', // What does this do?
    json: true
};


rp(site1).then(response => {
    //console.log(`JSON status: ${JSON.stringify(res)}`);
    for (var i=0; i<response.length; i++){
    console.log(`Tour ${i+1} name ${JSON.stringify(response[i]["Name"])}, date ${JSON.stringify(response[i]["Date"])}`);
    }
   /* let time = (new Date() - start)/1000;*/
    //totalCount = res.points.length;
    //console.log(`The session lasted ${totalCount/60} minutes`);
    //console.log(`The Start time of track_2013_10_23 was: ${res.start_time}`);
})
console.log("Starting my web requests:");
