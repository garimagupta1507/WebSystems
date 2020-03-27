// File tourDBRef.js
const DataStore = require('nedb-promises');
// Create NEDB instance for tourDB links it to disk file
let tourDB = DataStore.create(__dirname + '/toursDB');
module.exports = tourDB; // Shares tourDB instance
