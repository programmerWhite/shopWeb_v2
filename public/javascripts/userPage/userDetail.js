/**
 * Created by wy641 on 2017/10/25.
 */

$(function () {
    $('.user-nick-name-text').text(USER_INFO.nickName);

    $('.save-nick-name').off().on('click',function(){
        changeNickName($('.nick-input').val());
    });
});

function changeNickName(nickName) {
    $.ajax({
        type: "POST",
        url: "/changeNickName",
        data:{"nickName":nickName},
        dataType: "json",
        success: function(data){
            if(data.type == 1){
                noticeDiv('修改失败，稍后再试',2000,function () {
                    location.reload();
                });
            }
            if(data.type == 2){
                noticeDiv('修改成功',2000,function () {
                    location.reload();
                });
            }
        }
    });
}