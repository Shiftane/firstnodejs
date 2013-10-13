var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect : true});
db = new Db('mydb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'jobdb' database");
        db.collection('jobs', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'jobs' collection doesn't exist. Creating it with sample data...");
		
            }
        });
    }
});

exports.findByName = function(req, res) {
    var name = req.params.name;
    console.log('Retrieving locality by Name: ' + name);
    db.collection('localities', function(err, collection) {
        collection.find({'Name':{ $regex: name+' *', $options: 'i' }}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findByNPA = function(req, res) {
    var npa = req.params.npa;
    console.log('Retrieving locality by NPA: ' + npa);
    db.collection('localities', function(err, collection) {
        collection.find({'NPA': npa}).toArray(function(err, item) {
            res.send(item);
        });
    });
};