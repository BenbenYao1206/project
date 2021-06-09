var express = require('express');
var router = express.Router();

var mysql =require('mysql');
var connection =mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'123456',
  database:'project'
  
})
connection.connect();
//数据库里上传到页面
router.get('/', function (req, res, next) {
  var sql = 'select * from pro_juice';
  connection.query(sql, function (err, result, fields) {
      if (err) {
          console.log('err', err);
          return;
      } else { res.render('juice', { data: result }); }
  });
});

//点击下单把那一行数据上传到数据库里
router.post('/', (req, res) => {

  var insertSql = 'insert into pro_trolly(name,introduce,money,amount,sum_money) values(?,?,?,?,?)';
  connection.query(insertSql, [req.body.name,req.body.introduce,req.body.money,req.body.amount,req.body.sum_money], function (err, result, fields) {
  
      if (err) {
          console.log('err', err);
          return;
      } else {
         
          res.redirect('/trolly');
      }
  });
  });

//查询出数据库里的数据，并且按倒序的方式展示出来
router.get('/trolly',(req,res) => {
  connection.query("select * from pro_trolly order by id desc",function(err,results){
   var datastring = JSON.stringify(results);
   var data = JSON.parse(datastring);
   res.render('trolly',{
     "detail":data
   });
 })
});


  //点击下单，获取到下单的这一条数据的ID，然后把这个对应的数据展示出来
router.get('/order/:id' , (req,res)=>{
  connection.query("select * from pro_juice where id ='"+req.params.id+"'",function(err,results){
    if(err){
      return;
    }
    //点击下单，获取ID，然后然浏览量加一
  connection.query("update pro_juice set views = " + (results[0].views + 1) + " where id = " + req.params.id);
   
  connection.query("insert into pro_trolly(name,introduce,money) values(?,?,?)",[results[0].name,results[0].introduce,results[0].money],function(err){
      if(err){
        return;
      }
      res.redirect('/juice/trolly')
    })
  })
});

//购买数量加一，还没有成功
router.get('/plus/:id',(req,res) =>{
  connection.query("select * from pro_trolly where id ='"+req.params.id+"'",function(err,results){
    console.log(results);
    connection.query("update pro_trolly set amount = " + (results[0].amount + 1) + " where id = " + req.params.id ,function(){
      res.redirect('/juice/trolly');
    });
  });
});

//删除一条数据
router.get('/delete/:id',(req,res) =>{
  connection.query("delete from pro_trolly where id ='"+req.params.id+"'",function(){
    res.redirect('/juice/trolly')
  })
});

module.exports = router;







