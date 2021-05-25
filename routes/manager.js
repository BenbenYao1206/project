
const { json } = require('express');
var express = require('express');
var router = express.Router();
var path = require('path');
let data = new Array();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "project"
});


router.get('/',(req,res) => {
   connection.query("select * from pro_manager order by id desc limit 0,6",function(err,results){
     var datastring = JSON.stringify(results);
    var data = JSON.parse(datastring);
    res.render('manager',{
      "detail":data
    });
  })
});

// router.get('/delete:id',(req,res) =>{
//   connection.query("delect from pro_manager where id ='"+req.params.id+"'",function(err,results,fields){
//     connection.query("select * from pro_manager",function(err,results,fields){
//       var datasting = Json.parse(datasting);
//       console.log('result',data);
//       res.render('user',{"sqldata":data})
//     })
//   })
// });


router.get('/addpage',(req,res) =>{
  res.render('add',{obj:{},id:""});
});
module.exports = router;
