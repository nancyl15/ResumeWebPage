var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mywebpage', ['mywebpage']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/mywebpage', function (req, res) {
  console.log('I received a GET request');

  db.mywebpage.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/mywebpage', function (req, res) {
  console.log(req.body);
  db.mywebpage.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/mywebpage/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.mywebpage.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/mywebpage/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.mywebpage.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/mywebpage/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.edu);
  db.mywebpage.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {edu: req.body.edu, skill: req.body.skill, project: req.body.project}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8080);
console.log("Server running on port 8080");