var express = require('express');

var app = express();

app.get('/job', function(req, res){
	res.send([{name:'job1'},{name:'job2'}]);
});
app.get('/job/:id', function(req,res){
	res.send({id:req.params.id, name:"The Name", description: "description"});
});
app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
