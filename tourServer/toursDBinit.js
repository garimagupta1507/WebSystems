/*const DataStore = require('nedb-promises');
const db = DataStore.create(__dirname + '/toursDB');
const tours = require( "../ReactTour/tours.json");

async function initialize() { // so I can await!
    try {
        let numRemoved = await db.remove({}, {multi: true});
        console.log(`Cleanup, removed ${numRemoved} tours`);
        let newDocs = await db.insert(tours);
        console.log(`Added ${newDocs.length} tours`);
    } catch (err) {
        console.log(`Database error: ${err}`);
    }
}

initialize();*/


const tourDB = require('./tourDBRef'); // Get tourDB instance
const tours = require('./tours.json');

async function initTourDB() {
    try {
        let numRemoved = await tourDB.remove({}, {multi: true});
        console.log(`Cleanup, removed ${numRemoved} tours`);
        let newDocs = await tourDB.insert(tours);
        console.log(`Added ${newDocs.length} tours`);
    } catch (err) {
        console.log(`Database error: ${err}`);
    }
}
//initTourDB(); // Uncomment to run separately
module.exports = initTourDB; // Export for test use
