const rp = require('request-promise-native');
let site1 = {
    uri: 'https://windsurf.grotto-networking.com/data/logs/windEvents2016.json',
    method: 'GET', // What does this do?
    json: true
};

function findMinMax(arr,prop) {
  let max = arr[1][prop];

  for (let i = 0, len=arr.length; i < len; i++) {
    let v = arr[i][prop];
    max = (v > max) ? v : max;
  }

  return max;
}

rp(site1)
  .then(function (response) {

   console.log('Fastest 10 sec speed avergae: ',findMinMax(response, "max10sec"));
   console.log('Largest single day Distance',findMinMax(response, "distance"));
   return 'sucesss';
  })
  .catch(function (err) {
    // Deal with the error
    return console.log('failure');
  })
