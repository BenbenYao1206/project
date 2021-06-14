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
    res.render('register');
});

router.post('/', (req, res) => {
    if (req.body.pass !== req.body.cpass) {
        res.send('密码不一致');
    }else{
    var insertSql = 'insert into pro_user(name,pass,cpass,phone) values(?,?,?,?)';
    connection.query(insertSql, [req.body.name,req.body.pass,req.body.cpass,req.body.phone], function (err, result, fields) {
        if (err) {
            console.log('err', err);
            return;
        } else {
                 res.redirect('/');    
        }
    });
}
    });

module.exports = router;