/**
 * Created by wy641 on 2017/10/26.
 */

var crypto = require('crypto');
var query = require('../common/DBconnect');
var getMenuData = require('../common/getMenuData');

function userLoginAfterData(req,res) {
    this.req = req;
    this.res = res;
}

/*获取userDetail 信息*/
userLoginAfterData.prototype.userInfoManage = function (callBack) {
    var backData = {};
    function senData(type,data){
        if(type == 'userInfo'){
            backData.userInfo = data;
        }

        if(type == 'menu'){
            backData.menu = data;
        }

        if(!!backData.userInfo && !!backData.menu){
            callBack(backData);
        }
    }
    var sqlString = "select * from user where email=?";
    var sqlParameter = [this.req.session.userData.email];

    query(sqlString,sqlParameter,function (err,vals,files) {
        if(err){
            senData('userInfo','error');
        }else{
            senData('userInfo',vals);
        }
    });

    getMenuData(this.req,this.res,function(err,vals,fileds){
        if(!!err){
            senData('menu',"error");
        }else{
            senData('menu',vals);
        }
    });
};

module.exports = userLoginAfterData;