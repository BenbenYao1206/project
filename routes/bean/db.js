var mysql = require('mysql');

var db = {};

db.queryParam = function(sql,param,callback){
    var con = mysql.createConnection({
        host:"localhost",
        port:"3306",
        user:"root",
        password:"123456",
        database:"project",
        debug:ture
    });
    con.query(sql,param,(err,results) => {
        callback(err,results);
       
    });
    con.end();
    }

    module.exports = db;
