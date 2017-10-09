/**
 * Created by wy641 on 2017/8/8.
 */
var query = require('./DBconnect');
var getMenuData = require('./getMenuData');

function getShopData(req,res,callback){
    var pageNum = req.query.pageNum;
    var goodType = req.query.id;
    if(typeof pageNum == "undefined"){
        pageNum = 1;
    }
    getHotData();
    getNewGood();
    getShopPage();

    var pageData = {};
    function senData(type,data){
        if(data == "error"){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "exception": 'true',
                "response": '系统异常'
            }));
        }else{
            if(type == "hot"){
                pageData.hot = data;
            }
            if(type == "new"){
                pageData.new = data;
            }
            if(type == "page"){
                pageData.page = data;
            }
            if(type == "menu"){
                pageData.menu = data;
            }
            if(typeof pageData.menu != "undefined" && typeof pageData.hot != "undefined" && typeof pageData.new != "undefined" && typeof pageData.page != "undefined"){
                callback(pageData);
            }
        }
    }

    getMenuData(req,res,function(err,vals,fileds){
        if(!!err){
            senData('menu',"error");
        }else{
            senData('menu',vals);
        }
    });


    function getHotData(){
        var tempSqlString = 'SELECT * FROM good WHERE checkStatus = 1 ORDER BY scanTimes DESC LIMIT 0,10';
        query(tempSqlString,"",function(err,vals,fileds) {
            if(!!err){
                senData('hot',"error");
            }else{
                senData('hot',vals);
            }
        });
    }

    function getNewGood() {
        var tempSqlString = 'select * from good where checkStatus=1';
        var parame = [];
        if(typeof goodType != "undefined"){
            tempSqlString += ' AND goodType=?';
            parame.push(parseInt(goodType));
        }
        tempSqlString += ' ORDER BY upLoadTime DESC limit ?,?';
        parame.push(30*(pageNum-1),pageNum*30);

        query(tempSqlString,parame,function(err,vals,fileds) {
            if(!!err){
                senData('new',"error");
            }else{
                senData('new',vals);
            }
        });
    }

    function getShopPage(){
        var tempSqlString = 'select count(*) AS pageNum from good';
        var parame = [];
        if(!!req.query.id){
            tempSqlString += " where goodType=?";
            parame.push(req.query.id);
        }
        if(typeof goodType != "undefined"){
            tempSqlString += ' AND goodType=?';
            parame.push(parseInt(goodType));
        }

        query(tempSqlString,parame,function(err,vals,fileds) {
            if(!!err){
                senData('page',"error");
            }else{
                var currentPage = pageNum;
                var allPage = Math.ceil(vals[0].pageNum/30);
                if(!!req.query.page && currentPage <= allPage){
                    currentPage = req.query.page;
                }
                var pageObj = {
                    'allPage': allPage,
                    'currentPage': currentPage
                };
                senData('page',pageObj);
            }
        });
    }
}

module.exports = getShopData;