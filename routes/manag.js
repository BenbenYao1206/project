
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
   connection.query("select * from pro_user order by id desc",function(err,results){
    var datastring = JSON.stringify(results);
    var data = JSON.parse(datastring);
    res.render('manag',{
      "detail":data
    });
  })
});

//删除后台管理页面的数据
router.get('/delete/:id',(req,res) =>{
  connection.query("delete from pro_user where id ='"+req.params.id+"'",function(){
    res.redirect('/manag')
  })
});

//修改后台管理页面内的数据
router.get('/edit/:id',(req,res) => {
  connection.query("select * from pro_user where id ='"+req.params.id+"'",function(err,results){
    if(err){
      console.log("err",err)
    }
    var data = {
      "id":results[0].id,
      "name":results[0].name,
      "pass":results[0].pass,
      "cpass":results[0].cpass,
      "phone":results[0].phone,
      
    }
    console.log('result:',data);
    res.render('add_manag',{"detail":data});
  });
});

//后台用户信息编辑表单
router.post('/edit/:id',(req,res) => {
  connection.query("update pro_user set name = '"+req.body.name+"',pass = '"+req.body.pass+"',cpass = '"+req.body.cpass+"',phone = '"+req.body.phone+"' where id='"+req.body.id+"'",function(err,results){
    if(err){
      console.log("err",err)
    }
    res.redirect('/manag')
  });
});

//后台查询
router.post('/', (req, res) => {
  var searchSQL = "select * from pro_user where name = '" + req.body.name + "' and phone = '"+req.body.phone+"'";
  connection.query(searchSQL, function (err, results) {
      if (err) {
          console.log('err', err);
          return;
      }
      if (results == '') {
          console.log('查无此人');
      }
      var datastring = JSON.stringify(results);
      var data = JSON.parse(datastring);
      console.log('result:',data);
      res.render('manag',{"detail":data})
      })
    });


router.get('/addpage',(req,res) =>{
  res.render('add',{obj:{},id:""});
});
module.exports = router;
