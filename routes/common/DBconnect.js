/**
 * Created by wy641 on 2017/8/8.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'wy910823',
    port:'3306',
    database:'tiangongwards'
});

// var pool = mysql.createPool({
//         host:'sqld.duapp.com',
//         user:'2af03865f7192c0b5771bbad2b901dcd',
//         password:'B0eec2977c81116cd955c3b428a15ce4',
//         port:'4050',
//         database:'FoaWbevBQSxdQhylACrl'
// });

function query(sql,parames,callback){

    pool.getConnection(function(err,conn){
        if(err){
            callback(err,vals,fileds);
        }else{
            conn.query(sql,parames,function(err,vals,fileds){
                callback(err,vals,fileds);
            });
        }
        conn.release();//释放连接
    });
}

module.exports = query;