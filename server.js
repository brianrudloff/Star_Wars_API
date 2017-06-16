var MongoClient = require('mongodb').MongoClient
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

var Schema = mongoose.Schema;

var swSchema = new Schema({ type: 'Mixed' }, { strict : false });
var SWSchema = mongoose.model('SWSchema', swSchema);

app.post('/starwars', function (req, res){
  SWSchema.create(new SWSchema(req.body), function(err, createdElement){
    if (err) throw err;
    res.send('New item added.')
  });
  // starwars.insert(req.body, function(err, records){
  //   console.log('record add', records)
  // })
});

app.get('/starwars', (req, res) => {
    SWSchema.find({}, (err, data) => {
        if(err) console.log(err);
        res.json(data)
    })
})


app.listen(9494, () => console.log('server running on 9494....'))

