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

//购物车
// router.get('/trolly', function (req, res) {
//   // res.render('trolly')
//   var selectSQL = "select * from pro_trolly " 
//     connection.query(selectSQL, function (err, results, fields){
//       console.log(err);
//       console.log(results);
//       console.log(fields);
//       res.render('trolly',{detail:results} );
//     
//       });
// });

router.get('/trolly',(req,res) => {
  connection.query("select * from pro_trolly order by id desc",function(err,results){
   var datastring = JSON.stringify(results);
   var data = JSON.parse(datastring);
   res.render('trolly',{
     "detail":data
   });
 })
});

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

router.get('/order/:id' , (req,res)=>{
  connection.query("select name,introduce,money from pro_juice where id ='"+req.params.id+"'",function(err,results){
    if(err){
      return;
    }
    // console.log('result:',data);
    connection.query("insert into pro_trolly(name,introduce,money) values(?,?,?)",[results[0].name,results[0].introduce,results[0].money],function(err){
      if(err){
        return;
      }
      res.redirect('/juice/trolly')
    })
  })
})

module.exports = router;









// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('juice');
// });

// module.exports = router;