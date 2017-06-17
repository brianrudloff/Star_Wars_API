var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();

mongoose.connect('mongodb://localhost:27017/starwars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  
  extended: true
}));

app.use(express.static(__dirname));


// Set up mongoose schemas for database entry
var Schema = mongoose.Schema;

var swSchema = new Schema({ type: 'Mixed' }, { strict : false });
var SWSchema = mongoose.model('SWSchema', swSchema);


// Add new favorite to database
app.post('/starwars', (req, res) => {
  SWSchema.create(new SWSchema(req.body), function(err, createdElement){
    if (err) throw err;
    res.send('Post was added to the Jedi library.');
  });
});

// Update favorite with notes
app.post('/update', (req, res) => {
  let keys = Object.keys(req.body);
  let key = keys[0];
  let val = req.body[key];
  let upKey = keys[1];
  let upVal = req.body[upKey];

  let condition = {}
  condition[key] = val;
  
  let update = {}
  update[upKey] = upVal;

  SWSchema.update(condition, update, (err, data) => {
    if (err) throw err;
    res.send('Jedi records have been updated.');
  });
});

// delete favorite from database
app.delete('/starwars', (req, res) => {
  SWSchema.remove(req.body, (err, data) => {
    if (err) throw err;
    res.send('Master, your favorite has been erased from the archive memory.');
  });
});

// get favorites from database to display 
app.get('/starwars', (req, res) => {
    SWSchema.find({}, (err, data) => {
        if (err) throw err;
        res.json(data)
    });
});

app.listen(9494, () => console.log('server running on 9494....'));

