'use strict'
 
const express = require('express')
const bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var cors = require('cors')
 var id=0;
const app = express()

app.use(cors())

app.use(bodyParser.json());

// Route that receives a POST request to /sms
app.post('/form', function(req, res){
    res.setHeader('Content-Type', 'application/json');

	console.log('BODY IS '+req.body);
    //debugging output for the terminal
    console.log('you posted: First Name: ' + req.body.firstname + ', Last Name: ' + req.body.lastname);
	
	MongoClient.connect(url, function(err, db) {
		
  if (err) throw err;
  var dbo = db.db("AngularTestDb");
  var collection=dbo.collection("customers")
  collection.find({}, function(err, cursor){
 
            cursor.count(function(err, count){
                console.log('Total matches: ' + count);
				id=count;
            });
  });
  
  var myobj = { id:id+1,firstname: req.body.firstname, lastname: req.body.lastname, mobile: req.body.mobile, vrn: req.body.vrn, pickup: req.body.pickup, drop: req.body.drop };
  if(req.body.firstname!==null && req.body.mobile!==null){
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
	}
});
	
});

app.get('/getApi', function (req, res) {
    MongoClient.connect(url, function(err, db) {
		
  if (err) throw err;
  var dbo = db.db("AngularTestDb");
  var collection=dbo.collection("customers")
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
	
    db.close();
	res.send(result)
  });
  collection.find({}, function(err, cursor){
 
            cursor.count(function(err, count){
                console.log('Total matches: ' + count);
				id=count;
            });
  });
  
  /* var myobj = { id:id+1,firstName: req.body.firstname, lastName: req.body.lastname, mobile: req.body.mobile, vrn: req.body.vrn, pickup: req.body.pickup, drop: req.body.drop };
  if(req.body.firstName!==null && req.body.mobile!==null){
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
	} */
});
});
 
// Tell our app to listen on port 3000
app.listen(3000, function (err) {
  if (err) {
    throw err
  }
 
  console.log('Server started on port 3000')
})