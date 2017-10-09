/**
 * Created by wy641 on 2017/10/7.
 */
$(function(){
    var data = JSON.parse($('textarea').text());
    console.log(data)

    for(var i=0;i<data.length;i++){
        var domObj = $('<div>'+data[i].goodsContent+'</div>');
        $('.search-one-desc-div[dataId='+data[i].id+']').html(domObj.text().replace(/\^#\^/g,";").replace(/\^/g,"'"));
        domObj.remove();
    }
});