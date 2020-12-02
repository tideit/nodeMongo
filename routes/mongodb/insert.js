var mongodb = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/sun';

var URL = require('url');
var express = require('express');
var router = express.Router();

function insertData(client, params, callback)
{
    var db = client.db("sun");
    var connectionTest = db.collection("test");
    var testData = {"name":params.name,"age":params.age};
    connectionTest.insert(testData,function(error, result){
        if(error){
            console.log('Error:'+ error);
        }else{
            console.log(result.result.n);
        }

        callback(result.result.n);
    });

    var connectionOther = db.collection("other");
    var otherData = {"name":params.name,"job":params.job};
    connectionOther.insert(otherData,function(error, result){
        if(error){
            console.log('Error:'+ error);
        }else{
            console.log(result.result.n);
        }
    });
}

router.get('/insert', function(req, res, next){

    var params = URL.parse(req.url, true).query;

    MongoClient.connect(DB_CONN_STR, function(err, client) {
        console.log("连接成功！");
        insertData(client, params, function(result) {
            res.send("Delete Success:" + result);

            client.close();
            console.log("连接断开！");
        });
    });
})

module.exports = router;
