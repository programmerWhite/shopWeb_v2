/**
 * Created by wy641 on 2017/10/9.
 */
var query = require('./DBconnect');

function getMenuData(req,res,callback){
    var tempSqlString = 'SELECT typeName,typeNum FROM goodtype where auditing=1';
    query(tempSqlString,"",function(err,vals,fileds) {
        if(!!err){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "exception": 'true',
                "response": '系统异常'
            }));
        }else{
            callback(err,vals,fileds);
        }
    });
}

module.exports = getMenuData;