const DataStore = require('nedb-promises');
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

initialize();
