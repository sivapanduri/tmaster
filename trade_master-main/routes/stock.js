const express = require("express");

// stockRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const stockRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
stockRoutes.route("/stock").get(function (req, res) {
  let db_connect = dbo.getDb("market_data");
  db_connect
    .collection("stocks")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
stockRoutes.route("/stock/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("stocks").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you get a single record by id
stockRoutes.route("/stock_exists/:code").get(function (req, res) {
  let db_connect = dbo.getDb();
  console.log(req.params.code)
  let myquery = { code: req.params.code };
  db_connect.collection("stocks").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
stockRoutes.route("/stock/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    sector: req.body.sector,
    exchange_id: req.body.exchange_id,
  };
  db_connect.collection("stocks").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
stockRoutes.route("/stock/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues={ $set: {
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    sector: req.body.sector,
    exchange_id: req.body.exchange_id,
  }}
 db_connect.collection("stocks").updateOne(myquery,newvalues,function(err,res){
  if(err) throw err;
  console.log("1 document updated");
response.json(newvalues);  
  });
});
// This section will help you delete a record
stockRoutes.route("/stock/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  console.log("in stock",myquery)
  db_connect.collection("stocks").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
module.exports = stockRoutes;
