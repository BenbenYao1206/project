
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
   connection.query("select * from pro_manager order by id desc",function(err,results){
    var datastring = JSON.stringify(results);
    var data = JSON.parse(datastring);
    res.render('manag',{
      "detail":data
    });
  })
});

router.get('/delete/:id',(req,res) =>{
  connection.query("delete from pro_manager where id ='"+req.params.id+"'",function(){
    res.redirect('/manag')
  })
});


router.get('/edit/:id',(req,res) =>{
  connection.query("update pro_manager set (name,phone,juice,shop,time) values(?,?,?,?,?)",function(){
    res.redirect('/manag')
  })
});


router.get('/addpage',(req,res) =>{
  res.render('add',{obj:{},id:""});
});
module.exports = router;
