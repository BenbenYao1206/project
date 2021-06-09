let express = require ('express');
let router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "project"
});
connection.connect();


//把数据库里的数据返回到add页面,这个是用户信息的
router.get('/', function (req, res) {
    var selectSQL = "select * from pro_manager " 
      connection.query(selectSQL, function (err, results, fields){
        console.log(err);
        console.log(results);
        console.log(fields);
        res.render('add',{detail:results} );
      
        });
  });

  //添加数据到数据库里，当req.bpdy.name = name,时....然后这些数据就可以传到数据库里
router.post('/', (req, res) => {

    var insertSql = 'insert into pro_manager(name,pass,cpass,phone) values(?,?,?,?)';
    connection.query(insertSql, [req.body.name,req.body.pass,req.body.cpass,req.body.phone], function (err, result, fields) {
    
        if (err) {
            console.log('err', err);
            return;
        } else {
           
            res.redirect('/manag');
        }
    });
    });

module.exports = router;