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
        connection.query("select * from pro_juice order by id desc",function(err,results){
         var datastring = JSON.stringify(results);
         var data = JSON.parse(datastring);
         res.render('foods',{
           "detail":data
         });
       })
      });
      
      //删除后台管理页面的数据，品种表的删除
      router.get('/del/:id',(req,res) =>{
       connection.query("delete from pro_juice where id ='"+req.params.id+"'",function(){
         res.redirect('/foods')
       })
      });
      
      //修改后台管理页面内的数据，并且让你要修改的那一条数据的内容在你修改的页面展示出来，品种表的修改
      router.get('/edi/:id',(req,res) => {
       connection.query("select * from pro_juice where id ='"+req.params.id+"'",function(err,results){
         if(err){
           console.log("err",err)
         }
         var data = {
           "id":results[0].id,
           "image":results[0].image,
           "name":results[0].name,
           "money":results[0].money,
           "introduce":results[0].introduce,
           "views":results[0].views,
           
         }
         console.log('result:',data);
         res.render('alter_foods',{"detail":data});
       });
      });
      
      //在上一条路由走完了了以后，再更新一下数据，并且展示出来
      router.post('/edi/:id',(req,res) => {
       connection.query("update pro_juice set image = '"+req.body.image+"',name = '"+req.body.name+"',money = '"+req.body.money+"',introduce = '"+req.body.introduce+"',views = '"+req.body.views+"' where id='"+req.body.id+"'",function(err,results){
         if(err){
           console.log("err",err)
         }
         res.redirect('/foods')
       });
      });
      
      //后台查询，当name等于我页面上输入的name时，展示出这一整条数据到foods页面
      router.post('/', (req, res) => {
       var searchSQL = "select * from pro_juice where name = '" + req.body.name + "'";
       connection.query(searchSQL, function (err, results) {
           if (err) {
               console.log('err', err);
               return;
           }
           if (results == '') {
               console.log('查无此果');
           }
           var datastring = JSON.stringify(results);
           var data = JSON.parse(datastring);
           console.log('result:',data);
           res.render('foods',{"detail":data})
           })
         });

         module.exports = router;
            