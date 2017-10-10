/**
 * Created by Raintree on 2017/10/10.
 */
var express = require('express');
var router = express.Router();

var loginSign = require('./loginSign/loginSign');

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
};