var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url     = 'mongodb://mongouser:mongouser@ds121565.mlab.com:21565/krudlahedna';
var sCollection = "sensorBeta";

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  findDocuments(db, function() {
      db.close();
  });

  db.close();
});


var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection(sCollection);
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
