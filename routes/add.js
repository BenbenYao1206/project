// let express = require ('express');
// let router = express.Router();

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "project"
// });
// connection.connect();

// // router.get('/', function (req, res) {
// //     res.render('add');
// // });

// router.get('/', function (req, res) {
//     var selectSQL = "select * from pro_manager " 
//       connection.query(selectSQL, function (err, results, fields){
//         console.log(err);
//         console.log(results);
//         console.log(fields);
//         res.render('add',{detail:results} );
//       
//         });
//   });

// router.post('/', (req, res) => {

//     var insertSql = 'insert into pro_manager(name,phone,juice,shop) values(?,?,?,?)';
//     connection.query(insertSql, [req.body.name,req.body.phone,req.body.juice,req.body.shop], function (err, result, fields) {
    
//         if (err) {
//             console.log('err', err);
//             return;
//         } else {
           
//             res.redirect('/manager');
//         }
//     });
//     });

// module.exports = router;