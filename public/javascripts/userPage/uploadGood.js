/**
 * Created by wy641 on 2017/10/27.
 */
$(function () {
    getGoodDTypeData();
    $('.text-button').off().on('click',function () {
        $('.add-type-new,.shade-div').show();
    });

    $('.cancel-new-type-button').off().on('click',function () {
        $('.add-type-new,.shade-div').hide();
    });

    $('.add-new-type-button').off().on('click',function () {
        addTypeNew();
    });
});

function getGoodDTypeData(){
    $.post('/getGoodType',function (data) {
        console.log(data);
        for(var i=0;i<data.length;i++){
            var tempData = data[i];
            $('#goodType').append('<option value="'+tempData.id+'">'+tempData.typeName+'</option>');
            $('.had-type-text').append('<span class="had-type-name-text">'+tempData.typeName+'</span>');
        }
    });
}

function addTypeNew(){
    var newGoodType = $('#newGoodType').val();

    if(newGoodType == "" || newGoodType == " "){
        noticeDiv('添加类型内容不能为空那个',1500);
    }else{
        $.post('/addNewType',{'typeName':newGoodType},function (data) {
            console.log(data)
            if(data == 'error'){
                noticeDiv('添加失败',1500);

            }else{
                noticeDiv('添加成功',1500,function() {
                    $('#goodType').append('<option value="'+data[1]+'">'+data[0]+'</option>');
                    $('.had-type-text').append('<span class="had-type-name-text">'+data[0]+'</span>');
                });
            }
        });
    }

}