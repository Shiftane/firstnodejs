var express = require('express'),
    job = require('./routes/job');

var app = express();

app.get('/jobs', job.findAll);
app.get('/jobs/:id', job.findById);
app.post('/jobs', job.addJob);
app.put('/jobs/:id', job.updateJob);
app.delete('/jobs/:id', job.deleteJob);

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
