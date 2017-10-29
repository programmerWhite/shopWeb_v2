/**
 * Created by wy641 on 2017/10/26.
 */
var crypto = require('crypto');
var query = require('../common/DBconnect');

function userDataTool(req,res) {
    this.req = req;
    this.res = res;
}

userDataTool.prototype.changeNickName = function (callBack) {
    var sqlString = 'update user set nickName=? where email=?';
    var sqlParameter = [this.req.body.nickName,this.req.session.userData.email];
    query(sqlString,sqlParameter,function (err,vals,files) {
        if(!!err){
            callBack("error");
        }else{
            callBack(vals);
        }
    });
};

userDataTool.prototype.getGoodType = function(callBack){
    query('select * from goodtype','',function (err,vals,files) {
        if(!!err){
            callBack("error");
        }else{
            callBack(vals);
        }
    });
};

userDataTool.prototype.addNewType = function(callBack){

    var req = this.req;
    query('select max(typeNum) as maxNum from goodtype','',function (err,vals,files) {
        if(!!err){
            callBack("error");
        }else{

            var sqlString = 'insert into goodtype (typeName,typeNum) values (?,?)';
            var sqlParmeter = [req.body.typeName,++vals[0].maxNum];

            query(sqlString,sqlParmeter,function (err,vals,files) {
                if(!!err){
                    callBack("error");
                }else{
                    if(!!vals.insertId){
                        callBack(sqlParmeter);
                    }else{
                        callBack("error");
                    }
                }
            });
        }
    });


};

module.exports = userDataTool;
