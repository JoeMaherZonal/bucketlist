var express  = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser')
app.use( bodyParser.json())
var url = 'mongodb://localhost:27017/bucketlist';
app.use(express.static('client/build'))


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));

app.get('/entries', function(req, res){
  MongoClient.connect( url, function( err, db ) {
    var collection = db.collection( 'entries' )
    collection.find({}).toArray( function(err, docs ){
      res.json( docs );
      db.close();
    });
  });
});

app.post('/entries', function(req, res){
  console.log("found path!!!!!!!!!!!!")
  MongoClient.connect( url, function(err, db){
       var collection = db.collection( 'entries' )
       console.log(req.body)
       collection.insert( req.body );
       res.status(200).end();
       db.close()
     });
})

app.delete( '/entries/:id', function(req, res){
  MongoClient.connect( url, function(err, db){
    var collection = db.collection( 'entries' );
    collection.remove({ _id : new ObjectId(req.params.id) });
    res.status(200).end();
    db.close()
  })
})


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


