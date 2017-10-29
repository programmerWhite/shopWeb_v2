/**
 * Created by wy641 on 2017/10/26.
 */
var express = require('express');
var router = express.Router();

var userDataObj = require('./userAfterLoginData/userDataImp');

module.exports = function(app){
    app.post('/changeNickName',function (req,res,next) {
        var userDataObjTemp = new userDataObj(req,res);
        userDataObjTemp.changeNickName(function (data) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            if(data == 'error'){
                res.end(JSON.stringify({
                    'type':1
                }));
            }else{
                if(data.affectedRows == 1){
                    req.session.userData.nickName = req.body.nickName;
                    res.end(JSON.stringify({
                        'type':2
                    }));
                }
            }
        });
    });
    app.post('/getGoodType',function (req,res,next) {
        var userDataObjTemp = new userDataObj(req,res);
        userDataObjTemp.getGoodType(function (data) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        });
    });
    app.post('/addNewType',function (req,res,next) {

        var userDataObjTemp = new userDataObj(req,res);
        userDataObjTemp.addNewType(function (data) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        });

    });
};