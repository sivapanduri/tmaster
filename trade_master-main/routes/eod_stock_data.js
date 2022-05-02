const express = require("express");

// eod_stock_dataRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /eod_stock_data.
const eod_stock_dataRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the eod_stock_datas.
eod_stock_dataRoutes.route("/eod_stock_data").get(function (req, res) {
  let db_connect = dbo.getDb("market_data");
  db_connect
    .collection("eod_stock_data")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single eod_stock_data by id
eod_stock_dataRoutes.route("/eod_stock_data/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("eod_stock_data")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new eod_stock_data.
eod_stock_dataRoutes.route("/eod_stock_data/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    eod_date: req.body.eod_date,
stock_id: req.body.stock_id,
open: req.body.open,
high: req.body.high,
low: req.body.low,
last: req.body.last,
technical_rating: req.body.technical_rating,
oscillators_rating: req.body.oscillators_rating,
moving_averages_rating: req.body.moving_averages_rating,

  };
  db_connect.collection("eod_stock_data").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a eod_stock_data by id.
eod_stock_dataRoutes.route("/eod_stock_data/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();  
  let myquery = { _id: ObjectId( req.params.id )};  
  let newvalues = {    
    $set: {      
eod_date: req.body.eod_date,
stock_id: req.body.stock_id,
open: req.body.open,
high: req.body.high,
low: req.body.low,
last: req.body.last,
technical_rating: req.body.technical_rating,
oscillators_rating: req.body.oscillators_rating,
moving_averages_rating: req.body.moving_averages_rating,

  },  
}
db_connect.collection("eod_stock_data").updateOne(myquery,newvalues,function(err,res){
  if(err) throw err;
  console.log("1 document updated");
response.json(newvalues);  
  });
console.log("newvalues",newvalues)
});


// This section will help you delete a eod_stock_data
eod_stock_dataRoutes.route("/eodstockdata/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  console.log(myquery);
  db_connect.collection("eod_stock_data").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
   // console.log("1 document deleted");
    response.json(obj);
  });
});
module.exports = eod_stock_dataRoutes;