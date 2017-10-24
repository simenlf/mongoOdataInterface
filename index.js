var http        = require('http');
var ODataServer = require("simple-odata-server");
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url         = 'mongodb://mongouser:mongouser@ds121565.mlab.com:21565/krudlahedna';
var oDataServer;

var model = {
    namespace: "krudlahedna",
    entityTypes: {
        "sensorBeta": {
            "_id": {"type": "Edm.String", key: true},
            "sensor": {"type": "Edm.String"},
            "time": {"type": "Edm.Time"},
            "value": {"type": "Edm.Int64"}
        }
    },
    entitySets: {
        "sensorBeta": {
            entityType: "krudlahedna.sensorBeta"
        }
    }
};

console.log("Starting Krudlahedna Mongo/oData server");
oDataServer = ODataServer("http://localhost:8080").model(model);
MongoClient.connect(url, function(err, db) {oDataServer.onMongo(function(cb) { cb(err, db); });});
oDataServer.cors('*');
http.createServer(oDataServer.handle.bind(oDataServer)).listen(8080);
console.log("--------");
console.log("Schema sensorBeta");
//Eksempel : http://localhost:1337/sensorBeta
// http://localhost:1337/users?$filter=test eq 'a' or test eq 'b'&$skip=1&$take=5
//http://localhost:1337/sensorBeta?$filter=sensor eq 'Sensor A'
