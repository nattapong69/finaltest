var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds121456.mlab.com:21456/fsinstadb";
var db;
MongoClient.connect(url, function (err, database) {
    if (err) throw err;
    db = database;
    console.log("Connected to " + url);
});
function getAllPosts(req, res) {
    //Get data from mongoDB
    var sort={};
    var query = {};
    db.collection("posts").find().sort(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
    //POINT 4. Set sort the query by recently create_date
    // var sort = {}; 
    // db.collection("posts").find(query).sort(sort).toArray(function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.json(result);
    // });
}

function getPostsByUser(req, res) {
    // Additional 1.
    var role = req.params.role;
    //seach
    // if (err) throw err; 
    var query = {role:role};
    db.collection("posts").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
}

function insertNewPosts(req, res) {
    //Insert new data to mongoDB
    var newpost = req.body;
    db.collection("posts").insertOne(newpost, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result.ops);
    });
}

module.exports = {
    // POINT 5. Export the functions
    getAllPosts: getAllPosts,
    getPostsByUser: getPostsByUser,
    insertNewPosts: insertNewPosts

};
