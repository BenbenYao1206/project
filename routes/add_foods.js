
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


//获取到数据库里面的数据，并且传到add_fooda页面，这个是品种信息的添加
router.get('/', function (req, res) {
    var selectSQL = "select * from pro_juice " 
      connection.query(selectSQL, function (err, results, fields){
        console.log(err);
        console.log(results);
        console.log(fields);
        res.render('add_foods',{detail:results} );
      
        });
  });

//添加数据到数据库里，当req.bpdy.name = name,时....然后这些数据就可以传到数据库里
router.post('/', (req, res) => {

    var insertSql = 'insert into pro_juice(image,name,money,introduce,views) values(?,?,?,?,?)';
    connection.query(insertSql, [req.body.image,req.body.name,req.body.money,req.body.introduce,req.body.views], function (err, result, fields) {
    
        if (err) {
            console.log('err', err);
            return;
        } else {
           
            res.redirect('/foods');
        }
    });
    });

    module.exports = router;