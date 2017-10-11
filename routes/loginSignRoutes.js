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
            senEmail(email,req,res);
        }
    });
};


function senEmail(emailUrl,req,res){

    console.log(emailUrl)

    var smtpTransport = nodemailer.createTransport("SMTP",{
        host: "smtp.qq.com", // 主机
        secureConnection: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
            user: "641812518@qq.com", // 账号
            pass: "xguscbrqqxkdbahg" // 密码
        }
    });
    console.log(456456)
    // 设置邮件内容
    var sendAuthor=produceRandomNum(8);
    var emailAuthor=emailUrl+"#"+sendAuthor+"@";

    console.log(emailUrl)

    var mailOptions = {
        from: "Fred Foo <641812518@qq.com>", // 发件地址
        to: emailUrl, // 收件列表
        subject: "一个人导购", // 标题
        html: "你好！"+emailUrl+"<b>欢迎注册一个人购物推荐网站!</b><br/>验证码: "+sendAuthor  // html 内容
    }
    // 发送邮件
    query('select * from user where email=?',emailUrl,function(err,rows){
        if(err){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "exception":'true'
            }));
        }else{
            if(rows==""){
                smtpTransport.sendMail(mailOptions, function(error, response){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    if(error){
                        res.end(JSON.stringify({
                            "response":"系统异常",
                            "type":0
                        }));
                        console.log(error);
                    }else{
                        req.session.sendAuthor=sendAuthor;

                        res.end(JSON.stringify({
                            "response":"邮件发送成功，请查看验证码",
                            "type":1
                        }));
                    }
                    smtpTransport.close(); // 如果没用，关闭连接池
                });
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

function produceRandomNum(length){
    var tempString='';
    for(var i=0;i<length;i++){
        tempString+=parseInt(Math.random()*10);
    }
    return tempString;
}