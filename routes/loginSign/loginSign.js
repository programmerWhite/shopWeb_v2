/**
 * Created by Raintree on 2017/10/10.
 */
/*md5 插件*/
var crypto = require('crypto');
var query = require('../common/DBconnect');
var regularExpress = require('../common/regularExpress');
var getMenuData = require('../common/getMenuData');


function loginSignManage(req,res){
    this.req = req;
    this.res = res;
    this.regObj = new regularExpress();
}

loginSignManage.prototype.loginCertification = function(callback){
    var userName = this.req.body.loginUserName;
    var password = this.req.body.loginPassword;
    //Buffer 类是一个全局的类，是一个比较罕见的不需要 require('buffer') 就可以使用的类。
    var buf = new Buffer(password);
    var str = buf.toString("binary");
    password = crypto.createHash("md5").update(str).digest("hex");

    if(this.regObj.email(userName)){
        /*表示用户名符合邮箱的格式，判断为邮箱登录*/
        var tempSqlString = "select count(*) as dataNum from user where email=? and password=?";
        var parames = [userName,password];
    }else{
        if(this.regObj.loginName(userName)){
            /*否则判断为用户名登录*/
            var tempSqlString = "select email,maxUpNum,hadUpNum,nickName from user where userName=? and password=?";
            var parames = [userName,password];
        }else{
            var tempSqlString = "";
        }
    }

    var pageData = {};
    function senData(type,data){
        if(data == "error"){
            callback("error");
        }else{
            if(type == "userData"){
                pageData.userData = data;
            }
            if(type == "menu"){
                pageData.menu = data;
            }
            if(typeof pageData.menu != "undefined" && typeof pageData.userData != "undefined"){
                callback(pageData);
            }
        }
    }

    if(tempSqlString != ""){
        query(tempSqlString,parames,function(err,vals,files){
            if(!!err){
                senData('userData',"error");
            }else{
                if(vals.length == 0){
                    senData('userData',0);
                }else{
                    senData('userData',vals);
                }
            }
        });
    }else{
        senData('userData',0);
    }

    getMenuData(this.req,this.res,function(err,vals,fileds){
        if(!!err){
            senData('menu',"error");
        }else{
            senData('menu',vals);
        }
    });

};

module.exports = loginSignManage;

