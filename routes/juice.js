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

router.get('/', function (req, res, next) {
  var sql = 'select * from pro_juice';
  connection.query(sql, function (err, result, fields) {
      if (err) {
          console.log('err', err);
          return;
      } else { res.render('juice', { data: result }); }
  });
});

module.exports = router;









// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('juice');
// });

// module.exports = router;