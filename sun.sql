/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MongoDB
 Source Server Version : 30006
 Source Host           : localhost:27017
 Source Schema         : sun

 Target Server Type    : MongoDB
 Target Server Version : 30006
 File Encoding         : 65001

 Date: 02/12/2020 14:22:44
*/


// ----------------------------
// Collection structure for other
// ----------------------------
db.getCollection("other").drop();
db.createCollection("other");

// ----------------------------
// Documents of other
// ----------------------------
db.getCollection("other").insert([ {
    _id: ObjectId("5fc6fc219f1d2948746960f8"),
    name: "sun",
    job: "stu"
} ]);

// ----------------------------
// Collection structure for system.indexes
// ----------------------------
db.getCollection("system.indexes").drop();
db.createCollection("system.indexes");

// ----------------------------
// Documents of system.indexes
// ----------------------------
db.getCollection("system.indexes").insert([ {
    v: NumberInt("1"),
    key: {
        _id: NumberInt("1")
    },
    name: "_id_",
    ns: "sun.test"
} ]);
db.getCollection("system.indexes").insert([ {
    v: NumberInt("1"),
    key: {
        _id: NumberInt("1")
    },
    name: "_id_",
    ns: "sun.other"
} ]);

// ----------------------------
// Collection structure for test
// ----------------------------
db.getCollection("test").drop();
db.createCollection("test");

// ----------------------------
// Documents of test
// ----------------------------
db.getCollection("test").insert([ {
    _id: ObjectId("5fc6fc219f1d2948746960f7"),
    name: "sun",
    age: 30
} ]);
