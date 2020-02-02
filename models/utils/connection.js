const mongo = require('mongodb').MongoClient;


var database; // this will hold our database object as a reference point, so that we can keep our mongo connection open


function connect(dbUrl, dbName) {
    mongo.connect(dbUrl, { useUnifiedTopology: true })
        .then(client => {
            database = client.db(dbName);
        })
}

function getCollection(collectionName) {
    return database.collection(collectionName)
}


module.exports = {
    connect,
    getCollection
};
