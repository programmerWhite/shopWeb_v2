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
module.exports = userDataTool;