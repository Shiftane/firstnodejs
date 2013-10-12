var express = require('express'),
    job = require('./routes/job'),
    routes = require('./routes/routes');;

var app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
	layout : true
	})
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Index home page
app.get('/', routes.index);

// Jobs REST API
app.get('/jobs', job.findAll);
app.get('/jobs/:id', job.findById);
app.post('/jobs', job.addJob);
app.put('/jobs/:id', job.updateJob);
app.delete('/jobs/:id', job.deleteJob);

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
