var express = require('express');
var router = express.Router();

var getShopData = require('./common/getShopData');
var getMenuData = require('./common/getMenuData');

module.exports = function (app) {
    app.get('/', function (req, res, next) {
        indexPage(req, res, next);
    });
    app.get('/index', function (req, res, next) {
        indexPage(req, res, next);
    });
    app.get('/shopOne',function (req,res,next) {
        res.render('userPage/shopOne');
    });

    app.get('/login',function (req,res,next) {
        getMenuData(req,res,function(err,vals,fileds){
            res.render('userPage/login',{menuData:vals});
        });
    });

    app.get('/userPage/sign',function (req,res,next) {
        res.render('userPage/sign');
    });
    app.get('/forgetPassword',function (req,res,next) {
        getMenuData(req,res,function(err,vals,fileds){
            res.render('userPage/forgetPassword',{menuData:vals});

        });
    });
    app.get('/sign',function (req,res,next) {
        getMenuData(req,res,function(err,vals,fileds){
            res.render('userPage/sign',{menuData:vals});

        });
    });

};

function indexPage(req, res, next){

    getShopData(req,res,function(data) {
        res.render('index',
            {
                hotData:data.hot,//热门商品
                shopData:data.new,//以时间为顺序显示最新的商品
                menuData:data.menu,
                pageObj:data.page//分页数据
            }
        );
    });
}