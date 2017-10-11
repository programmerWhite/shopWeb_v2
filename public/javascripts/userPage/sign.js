/**
 * Created by wy641 on 2017/10/9.
 */

$(function(){
    $('#sendLoginEmail').off().on('click',function(){
        sentAuthorEmail();
    });

    $('input').off().on('focus',function(){
        $(this).next('.notice-error').remove();
    });

});


function sentAuthorEmail(){

    var reg_obj = new Regex_tool();
    var email = $('#email').val();

    if(!reg_obj.email(email)){
        var noticeError = $('<span class="notice-error">你输入的邮件格式不正确</span>');
        $('#email').after(noticeError);
        noticeError.css({
            'left':'105px',
            'top':'38px'
        });
    }else{
        $.ajax({
            type: "POST",
            url: "#",
            data:{"email":email},
            dataType: "json",
            success: function(data){

            }
        });
    }

}