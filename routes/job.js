var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect : true});
db = new Db('jobdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'jobdb' database");
        db.collection('jobs', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'jobs' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving job: ' + id);
    db.collection('jobs', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('jobs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addJob = function(req, res) {
    var job = req.body;
    console.log('Adding job: ' + JSON.stringify(job));
    db.collection('jobs', function(err, collection) {
        collection.insert(job, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateJob = function(req, res) {
    var id = req.params.id;
    var job = req.body;
    console.log('Updating job: ' + id);
    console.log(JSON.stringify(job));
    db.collection('jobs', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, job, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating job: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(job);
            }
        });
    });
}
 
exports.deleteJob = function(req, res) {
    var id = req.params.id;
    console.log('Deleting job: ' + id);
    db.collection('jobs', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var jobs = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
 
    db.collection('jobs', function(err, collection) {
        collection.insert(jobs, {safe:true}, function(err, result) {});
    });
 
};



