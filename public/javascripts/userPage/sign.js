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

    $('#SignOk').off().on('click',function () {
        signUser();
    });
});

/*发送邮件验证码*/
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
            url: "/sentEmail",
            data:{"email":email},
            dataType: "json",
            success: function(data){
                console.log(data);
            }
        });
    }

    reg_obj = null;
}

/*注册用户方法*/
function signUser(){

    var reg_obj = new Regex_tool();

    var email = $('#email').val();
    var signUserName = $('#signUserName').val();
    var signEmailAuthor = $('#signEmailAuthor').val();
    var SignPassword = $('#SignPassword').val();
    var againPassword = $('#againPassword').val();
    var InvitationCode = $('#InvitationCode').val();

    var yesNo = 1;

    var noticeError = $('<span class="notice-error"></span>');

    if(!reg_obj.email(email)){
        var emailNoticeError = noticeError.clone();
        emailNoticeError.text("你输入的邮件格式不正确");
        $('#email').after(emailNoticeError);
        emailNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(!reg_obj.loginName(signUserName)){
        var userNameNoticeError = noticeError.clone();
        userNameNoticeError.text("用户名只能是字母、数字 1-19位");
        $('#signUserName').after(userNameNoticeError);
        userNameNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(!reg_obj.password(SignPassword)){
        var SignPasswordNoticeError = noticeError.clone();
        SignPasswordNoticeError.text("密码需要6-20位");
        $('#SignPassword').after(SignPasswordNoticeError);
        SignPasswordNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(SignPassword != againPassword){
        var againPasswordNoticeError = noticeError.clone();
        againPasswordNoticeError.text("两次密码不一样");
        $('#againPassword').after(againPasswordNoticeError);
        againPasswordNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(signEmailAuthor != "" || signEmailAuthor != " "){
        var signEmailAuthorNoticeError = noticeError.clone();
        signEmailAuthorNoticeError.text("邮件验证码不能为空");
        $('#signEmailAuthor').after(signEmailAuthorNoticeError);
        signEmailAuthorNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(yesNo == 1){

    }
}