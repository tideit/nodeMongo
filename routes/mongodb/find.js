var mongodb = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/sun';

var URL = require('url');
var CollectionTest = require('./collectionTest');
var express = require('express');
var router = express.Router();
var async = require('async');

var selectData = function(client, params, callback) {

    //连接到表
    var db = client.db('sun');
    var collectionTest = db.collection('test');
    var collectionOther = db.collection('other');

    //查询数据
    var whereStr;
    if (params.name) whereStr = {"name" : params.name};
    collectionTest.find(whereStr, function(error, results){
        if (error) throw error;

        results.toArray(function(err, arr){
            if (error) throw error;

            // async.map会将循环处理完以后，统一执行callback而不像其他异步调用执行分别执行
            async.map(arr, function(item, callback){
                var whereStr = {"name": item.name};
                collectionOther.find(whereStr, function(error, result){
                    result.toArray(function(err, arrJob){
                        console.log(arrJob);
                        console.log("------------------------");
                        if (arrJob){
                            item.job = arrJob[0].job;
                            console.log(item);
                            console.log("*************************");
                        }
                        callback(null, item);
                    });
                })
            }, function(err, result){
                // result是上表面item组成的数组
                callback(result);
            })
        });
    });
}

router.get('/find', function(req, res, next){

    var params = URL.parse(req.url, true).query;

    MongoClient.connect(DB_CONN_STR, function(err, client) {
        console.log("连接成功！");
        selectData(client, params, function(result) {
            res.send(JSON.stringify(result));

            client.close();
            console.log("连接断开！");
        });
    });
})

module.exports = router;
