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
        var tempSqlString = "select email,maxUpNum,hadUpNum,nickName as dataNum from user where email=? and password=?";
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

loginSignManage.prototype.signUser = function(data,callback){
    var yesNo = 1;

    var errorData = [];
    if(!this.regObj.email(data.email)){
        errorData.push({
            'obj':'email',
            'errorText':'你输入的邮件格式不正确'
        });
        yesNo = 0;
    }

    if(!this.regObj.loginName(data.signUserName)){
        errorData.push({
            'obj':'signUserName',
            'errorText':'用户名只能是字母、数字 1-19位'
        });
        yesNo = 0;
    }

    if(!this.regObj.password(data.SignPassword)){
        errorData.push({
            'obj':'signUserName',
            'errorText':'密码需要6-20位'
        });
        yesNo = 0;
    }

    if(data.SignPassword != data.againPassword){
        errorData.push({
            'obj':'againPassword',
            'errorText':'两次密码不一样'
        });
        yesNo = 0;
    }


    if(data.InvitationCode.length != 20 && data.InvitationCode.length != '' && data.InvitationCode.length != " "){
        errorData.push({
            'obj':'InvitationCode',
            'errorText':'邀请码不正确'
        });
        yesNo = 0;
    }

    if(data.InvitationCode){
        errorData.push({
            'obj':'signEmailAuthor',
            'errorText':'邮件验证码不正确'
        });
        yesNo = 0;
    }

    if(yesNo == 1){
        //query('select count(*) as number from user where invitationCode=?',[data.InvitationCode],function(err,vals,files){
        //    if(err){
        //        callback("error");
        //    }else{
        //        console.log(vals[0].number)
        //        if(vals[0].number == 0){
        //            callback({
        //                'obj':'invitationCode',
        //                'errorText':'邀请码不存在，如果没有可以不填'
        //            });
        //        }else{
                    query('select count(*) as userNum from user where userName=?',[data.signUserName],function(err,vals,files){
                        if(err){
                            callback("error");
                        }else{
                            if(vals[0].userNum != 0){
                                callback({
                                    'obj':'signUserName',
                                    'errorText':'用户名已存在'
                                });
                            }else{
                                var buf = new Buffer(data.SignPassword);
                                var str = buf.toString("binary");
                                var password = crypto.createHash("md5").update(str).digest("hex");

                                query('insert into user (userName,password,email,invitationCode,registrationTime) values(?,?,?,?,?)',
                                    [data.signUserName,password,data.email,data.invitationCode,Date.parse(new Date())],
                                    function(err,vals,files){
                                        callback(vals);
                                    }
                                );
                            }

                        }
                    });
        //        }
        //    }
        //});

    }else{
        callback(errorData);
    }
};

loginSignManage.prototype.findPassword = function(data,callback){
    var yesNo = 1;

    var errorData = [];
    if(!this.regObj.email(data.email)){
        errorData.push({
            'obj':'email',
            'errorText':'你输入的邮件格式不正确'
        });
        yesNo = 0;
    }

    if(!this.regObj.password(data.SignPassword)){
        errorData.push({
            'obj':'signUserName',
            'errorText':'密码需要6-20位'
        });
        yesNo = 0;
    }

    if(data.SignPassword != data.againPassword){
        errorData.push({
            'obj':'againPassword',
            'errorText':'两次密码不一样'
        });
        yesNo = 0;
    }


    if(yesNo == 1){


        var buf = new Buffer(data.SignPassword);
        var str = buf.toString("binary");
        var password = crypto.createHash("md5").update(str).digest("hex");

        var sqlString ='update user set password=? where email=?';
        var sqlParameter = [password,data.email];

        query(sqlString,sqlParameter,function(err,vals,files){
            if(err){
                callback('error');
            }else{
                callback(vals);
            }
        });
    }
};
module.exports = loginSignManage;

