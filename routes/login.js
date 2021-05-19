
let express = require ('express');
let router = express.Router();

var mysql =require('mysql');
var connection =mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'project'
})
connection.connect();


router.get('/', function (req, res) {
  res.render('login');
});
router.post('/login', (req, res) => {


  var selectSQL = "select name,pass from pro_user where name = '" + req.body.name + "' and pass = " + req.body.pass + "";
  connection.query(selectSQL, function (err, result, fields) {
      if (err) {
          console.log('err', err);
          return;
      } else {
       
          if (result == '') {
              res.send('登录失败');
          }
          else {
            res.redirect('/index');
          }
      }
  });
});

module.exports = router;
