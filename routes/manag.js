
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

//在页面显示数据库里数据，并且让其递减
router.get('/',(req,res) => {
   connection.query("select * from pro_manager order by id desc",function(err,results){
    var datastring = JSON.stringify(results);
    var data = JSON.parse(datastring);
    res.render('manag',{
      "detail":data
    });
  })
});

//删除后台管理页面的数据
router.get('/delete/:id',(req,res) =>{
  connection.query("delete from pro_manager where id ='"+req.params.id+"'",function(){
    res.redirect('/manag')
  })
});

//修改后台管理页面内的数据
router.get('/edit/:id',(req,res) => {
  connection.query("select * from pro_manager where id ='"+req.params.id+"'",function(err,results){
    if(err){
      console.log("err",err)
    }
    var data = {
      "id":results[0].id,
      "name":results[0].name,
      "phone":results[0].phone,
      "juice":results[0].juice,
      "shop":results[0].shop,
      "time":results[0].time,
    }
    console.log('result:',data);
    res.render('add_manag',{"detail":data});
  });
});

//后台用户信息编辑表单
router.post('/edit/:id',(req,res) => {
  connection.query("update pro_manager set name = '"+req.body.name+"',phone = '"+req.body.phone+"',juice = '"+req.body.juice+"',shop = '"+req.body.shop+"',time = '"+req.body.time+"'  where id='"+req.body.id+"'",function(err,results){
    if(err){
      console.log("err",err)
    }
    res.redirect('/manag')
  });
});

// router.get('/edit/:id',(req,res) =>{
//   connection.query("update pro_manager where id ='"+req.params.id+"' set (name,phone,juice,shop,time) =(?,?,?,?,?) ",[req.body.name,req.body.phone,req.body.juice,req.body.shop,req.body.time], 
//   function(){
//     res.redirect('/manag')
//   })
// });


router.get('/addpage',(req,res) =>{
  res.render('add',{obj:{},id:""});
});
module.exports = router;
