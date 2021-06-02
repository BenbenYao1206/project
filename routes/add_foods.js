
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



router.get('/', function (req, res) {
    var selectSQL = "select * from pro_juice " 
      connection.query(selectSQL, function (err, results, fields){
        console.log(err);
        console.log(results);
        console.log(fields);
        res.render('add_foods',{detail:results} );
      
        });
  });

router.post('/', (req, res) => {

    var insertSql = 'insert into pro_juice(name,money,introduce,views) values(?,?,?,?)';
    connection.query(insertSql, [req.body.name,req.body.money,req.body.introduce,req.body.views], function (err, result, fields) {
    
        if (err) {
            console.log('err', err);
            return;
        } else {
           
            res.redirect('/foods');
        }
    });
    });

    module.exports = router;