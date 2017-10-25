/**
 * Created by wy641 on 2017/10/9.
 */
$(function(){
    $('#sendFindPasswordEmail').off().on('click',function(){
        sentAuthorEmail();
    });

    $('#findPasswordOK').off().on('click',function(){
        findPassword();
    });
    $('input').off().on('focus',function(){
        $(this).next('.notice-error').remove();
    });
});

/*发送邮件验证码*/
function sentAuthorEmail(){

    var reg_obj = new Regex_tool();
    var email = $('#findPasswordEmail').val();

    if(!reg_obj.email(email)){
        var noticeError = $('<span class="notice-error">你输入的邮件格式不正确</span>');
        $('#findPasswordEmail').after(noticeError);
        noticeError.css({
            'left':'105px',
            'top':'38px'
        });
    }else{
        $.ajax({
            type: "POST",
            url: "/findPasswordSentEmail",
            data:{"email":email},
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data.type == 2 || data.type == 1 || data.type == 0){
                    var noticeError = $('<span class="notice-error">'+data.response+'</span>');
                    $('#findPasswordEmail').after(noticeError);
                    noticeError.css({
                        'left':'105px',
                        'top':'38px'
                    });
                }
            }
        });
    }

    reg_obj = null;
}

function findPassword(){

    var reg_obj = new Regex_tool();

    var findPasswordEmail = $('#findPasswordEmail').val();
    var FindPasswordEmailAuthor = $('#FindPasswordEmailAuthor').val();
    var newPassword = $('#newPassword').val();
    var newAgainPassword = $('#newAgainPassword').val();

    var yesNo = 1;

    var noticeError = $('<span class="notice-error"></span>');

    if(!reg_obj.email(findPasswordEmail)){
        var emailNoticeError = noticeError.clone();
        emailNoticeError.text("你输入的邮件格式不正确");
        $('#findPasswordEmail').after(emailNoticeError);
        emailNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(!reg_obj.password(newPassword)){
        var SignPasswordNoticeError = noticeError.clone();
        SignPasswordNoticeError.text("密码需要6-20位");
        $('#newPassword').after(SignPasswordNoticeError);
        SignPasswordNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(newAgainPassword != newAgainPassword){
        var againPasswordNoticeError = noticeError.clone();
        againPasswordNoticeError.text("两次密码不一样");
        $('#newAgainPassword').after(againPasswordNoticeError);
        againPasswordNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(newAgainPassword == "" || newAgainPassword == " "){
        var signEmailAuthorNoticeError = noticeError.clone();
        signEmailAuthorNoticeError.text("邮件验证码不能为空");
        $('#newAgainPassword').after(signEmailAuthorNoticeError);
        signEmailAuthorNoticeError.css({
            'left':'105px',
            'top':'38px'
        });
        yesNo = 0;
    }

    if(yesNo == 1){
        var postData = {
            'email':findPasswordEmail,
            'signEmailAuthor':FindPasswordEmailAuthor,
            'SignPassword':newPassword,
            'againPassword':newAgainPassword,
        };
        $.ajax({
            type: "POST",
            url: "/findPassword",
            data:postData,
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data.type == 1){
                    noticeDiv("密码修改成功",2000,function(){
                        location.href = '/login';
                    });
                }
            }
        });
    }
}