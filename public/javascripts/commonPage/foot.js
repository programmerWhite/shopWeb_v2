/**
 * Created by Raintree on 2016/9/13.
 */
//$(function(){
    $('.share-zone').off().on('click',function(){
        var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
        _shareUrl += 'url=' + encodeURIComponent("http://www.baidu.com");   //参数url设置分享的内容链接|默认当前页location
        _shareUrl += '&showcount=' + 0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
        _shareUrl += '&desc=' + encodeURIComponent('分享的描述');    //参数desc设置分享的描述，可选参数
        _shareUrl += '&title=' + encodeURIComponent(document.title);    //参数title设置分享标题，可选参数
        _shareUrl += '&pics=' + encodeURIComponent('https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2009838487,672619722&fm=58');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
        _shareUrl+='&comment=' + 1;
        var _width=400,_height=600;
        window.open(_shareUrl,'_blank','width=700,height=600,top='+(screen.height-_width)/2+',left='+(screen.width-_height)/2+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
    });

    $('.share-sina').off().on('click',function(){
        var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136';     //真实的appkey ，必选参数
        _shareUrl += '&url='+ encodeURIComponent("http://www.baidu.com");     //参数url设置分享的内容链接|默认当前页location，可选参数
        _shareUrl += '&title=' + encodeURIComponent(document.title);    //参数title设置分享的标题|默认当前页标题，可选参数
        _shareUrl += '&source=' + encodeURIComponent(" ");
        _shareUrl += '&sourceUrl=' + encodeURIComponent(" ");
        _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
        _shareUrl += '&pic=' + encodeURIComponent('https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2009838487,672619722&fm=58');  //参数pic设置图片链接|默认为空，可选参数
        var _width=640,_height=530;
        window.open(_shareUrl,'_blank','toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0,' + 'width=' + _width + ',height=' + _height + ',top=' + (screen.height-_height)/2 + ',left=' + (screen.width-_width)/2);
    });
    $('.share-douban').off().on('click', function () {
        var _shareUrl = 'http://shuo.douban.com/!service/share?';
        _shareUrl += 'href=' + encodeURIComponent(location.href);    //分享的链接
        _shareUrl += '&name=' + encodeURIComponent(document.title);    //分享的标题
        _shareUrl += '&image=' + encodeURIComponent('https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2009838487,672619722&fm=58');    //分享的图片
        var _width=750,_height=480;
        window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',left='+(screen.width-_width)/2+',top='+(screen.height-_height)/2+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
    });
//});

$(window).scroll(function(){
    if($(window).scrollTop() > 200){
        $('.go-top-div').show();
    }else{
        $('.go-top-div').hide();
    }
});

$('.go-top-div').off().on('click',function(){
    $(window).scrollTop(0);
});