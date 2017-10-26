/**
 * Created by Raintree on 2017/10/10.
 */
var express = require('express');
var router = express.Router();

var query = require('./common/DBconnect');
var loginSign = require('./loginSign/loginSign');
var nodemailer = require("nodemailer");
var regularExpress = require('./common/regularExpress');

module.exports = function(app){
    /*登录认证*/
    app.post('/loginSignManage',function(req,res,next){
        var loginCertification = new loginSign(req,res);
        loginCertification.loginCertification(function(data){
            if(data == "error"){
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    "exception": 'true',
                    "response": '系统异常'
                }));
            }else{
                if(data.userData != 0){//登录成功，跳转到用户详情页面
                    req.session.userData = data.userData[0];
                    res.redirect('/userDetail');
                }else{//登录失败，跳转到登录页面
                    res.redirect('/login?type=1');
                }
            }
        });
    });
    /*发送邮件验证码*/
    app.post('/sentEmail',function(req,res,next){
        var email = req.body.email;

        var reg_obj = new regularExpress();
        if(!reg_obj.email(email)){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "response":"请检查邮件的格式是否正确",
                "type":3
            }));
        }else{
            // 验证邮件是否存在
            query('select * from user where email=?',email,function(err,rows){
                if(err){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        "exception":'true'
                    }));
                }else{
                    if(rows==""){
                        senEmail(email,req,res);
                    }else{
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            "response":"邮箱已经被注册",
                            "type":2
                        }));
                    }
                }

            });
        }
    });
    /*找回密码发送邮件*/
    app.post('/findPasswordSentEmail',function(req,res,next){
        var email = req.body.email;

        var reg_obj = new regularExpress();
        if(!reg_obj.email(email)){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "response":"请检查邮件的格式是否正确",
                "type":3
            }));
        }else{
            // 验证邮件是否存在
            query('select * from user where email=?',email,function(err,rows){
                if(err){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        "exception":'true'
                    }));
                }else{
                    if(rows==""){
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            "response":"邮箱不存在",
                            "type":2
                        }));
                    }else{
                        senEmail(email,req,res);
                    }
                }

            });
        }
    });
    /*注册用户*/
    app.post('/signUser',function(req,res,next){

        if(req.body.signEmailAuthor != req.session.sendAuthor.authorCode){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                'obj':'signEmailAuthor',
                'errorText':'你输入的邮箱验证码不正确'
            }));
        }else{
           if(req.session.sendAuthor.email != req.body.email){
               res.writeHead(200, {'Content-Type': 'application/json'});
               res.end(JSON.stringify({
                   'obj':'email',
                   'errorText':'你输入的邮箱和验证码邮箱不一样'
               }));
           }else{
               var postData = {
                   'email':req.body.email,
                   'signUserName':req.body.signUserName,
                   'signEmailAuthor':req.body.signEmailAuthor,
                   'SignPassword':req.body.SignPassword,
                   'againPassword':req.body.againPassword,
                   'InvitationCode':req.body.InvitationCode
               };

               var loginCertification = new loginSign(req,res);
               loginCertification.signUser(postData,function(data){
                   if(data == 'error'){
                       res.direction('/error');
                   }else{
                       if(data.affectedRows == 1){
                           res.writeHead(200, {'Content-Type': 'application/json'});
                           res.end(JSON.stringify({
                               'type':'4'
                           }));
                       }
                   }
               });
           }
        }
    });
    /*找回密码*/
    app.post('/findPassword',function(req,res,next){
        if(req.body.signEmailAuthor != req.session.sendAuthor.authorCode){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                'obj':'signEmailAuthor',
                'errorText':'你输入的邮箱验证码不正确'
            }));
        }else {
            if (req.session.sendAuthor.email != req.body.email) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    'obj': 'email',
                    'errorText': '你输入的邮箱和验证码邮箱不一样'
                }));
            } else {
                var postData = {
                    'email':req.body.email,
                    'SignPassword':req.body.SignPassword,
                    'againPassword':req.body.againPassword,
                    'signEmailAuthor':req.body.signEmailAuthor
                };
                var loginCertification = new loginSign(req,res);
                loginCertification.findPassword(postData,function(data){
                    if(data == 'error'){
                        res.direction('/error');
                    }else{
                        if(data.affectedRows == 1){
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({
                                'type':'1'
                            }));
                        }
                    }
                });
            }
        }

    });
    /*检查是否登录*/
    app.post('/checkLogin',function (req,res,next) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        if(!!req.session.userData){
            res.end(JSON.stringify({
                "type":2,
                "userData":req.session.userData
            }));
        }else{
            res.end(JSON.stringify({
                "type":1
            }));
        }
    });
};

/*发送邮件*/
function senEmail(emailUrl,req,res){
    var smtpTransport = nodemailer.createTransport("SMTP",{
        host: "smtp.qq.com", // 主机
        secureConnection: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
            user: "641812518@qq.com", // 账号
            pass: "xguscbrqqxkdbahg" // 密码
        }
    });
    // 设置邮件内容
    var sendAuthor=produceRandomNum(8);
    var emailAuthor=emailUrl+"#"+sendAuthor+"@";

    var mailOptions = {
        from: "Fred Foo <641812518@qq.com>", // 发件地址
        to: emailUrl, // 收件列表
        subject: "一个人导购", // 标题
        html: "你好！"+emailUrl+"<b>欢迎注册一个人购物推荐网站!</b><br/>验证码: "+sendAuthor  // html 内容
    };

    console.log(sendAuthor);

    smtpTransport.sendMail(mailOptions, function(error, response){
        res.writeHead(200, {'Content-Type': 'application/json'});
        if(error){
            res.end(JSON.stringify({
                "response":"系统异常",
                "type":0
            }));
        }else{
            req.session.sendAuthor={
                'email':emailUrl,
                'authorCode':sendAuthor
            };

            res.end(JSON.stringify({
                "response":"邮件发送成功，请到邮件箱查看验证码",
                "type":1
            }));
        }
        smtpTransport.close(); // 如果没用，关闭连接池
    });

}

/*生成随机数*/
function produceRandomNum(length){
    var tempString='';
    for(var i=0;i<length;i++){
        tempString+=parseInt(Math.random()*10);
    }
    return tempString;
}