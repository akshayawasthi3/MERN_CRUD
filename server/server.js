
var express = require('express');
var multer = require('multer');
const cors = require("cors");
var upload = multer();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/datadb';
var app = express();
app.use(cors());
app.use(express.json());
app.use(upload.array()); 
app.use(express.urlencoded({ extended: true }));
var respo;
app.post('/insertDetails',function (req, res) {
    var UserDetails = {
        UserName : req.body.UserName,
        UserMobile : req.body.UserMobile,
        UserEmail : req.body.UserEmail
    };
    // console.log('my obj 1',req);  
    console.log('body',req.body.UserName);  
    MongoClient.connect(url,async function (err, db){
        if (!err) {
            console.log('Connected to DB');
        }
        var _db = db.db('datadb')
       const insert = await _db.collection('Employee').insertOne(UserDetails);
        db.close();
        respo = insert;
        res.json(insert);
});
    // res.sendStatus(respo);
 })

app.post('/updateDetails',function (req, res) {
    var user_id =req.body.id ;    
    var UserDetails = {
        UserName : req.body.UserName,
        UserMobile : req.body.UserMobile,
        UserEmail : req.body.UserEmail
    };
    // console.log('my obj 1',req);  
    console.log('body',req.body.UserName);  
    MongoClient.connect(url,async function (err, db){
        if (!err) {
            console.log('Connected to DB');
        }
        var _db = db.db('datadb')
        var ObjectId = require('mongodb').ObjectID;
       const update = await _db.collection('Employee').updateOne({
        "_id": ObjectId(user_id)
    }, {
        $set: {
            UserName : req.body.UserName,
            UserMobile : req.body.UserMobile,
            UserEmail : req.body.UserEmail
        }
    });
    var result = {'status': true}
    res.json(result);
 })
})
app.post('/DeleteDetails',function (req, res) {
    var user_id =req.body.id ;    
    // console.log('my obj 1',req);  
    console.log('body',req.body.UserName);  
    MongoClient.connect(url,async function (err, db){
        if (!err) {
            console.log('Connected to DB');
        }
        var _db = db.db('datadb')
        var ObjectId = require('mongodb').ObjectID;
       const update = await _db.collection('Employee').deleteOne(
        {
            "_id": ObjectId(user_id)
        }

    );
    var result = {'status': true}
    res.json(result);
 })
})

app.post('/AllRecords',function (req, res) {
    var UserDetails = {
        UserName : req.body.UserName,
        UserMobile : req.body.UserMobile
    };
    console.log('my obj',UserDetails);    
    MongoClient.connect(url,async function (err, db){
        if (!err) {
            console.log('Connected to DB');
        }
        var _db = db.db('datadb')
       const insert = await _db.collection("Employee").find({})
       .toArray(function (err, result) {
         if (err) throw err;
         res.json(result);
       });
    // res.sendStatus(respo);
    })
});
 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port    
    console.log("Express Example app listening at http://%s:%s", host, port)
 })