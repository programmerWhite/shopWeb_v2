/**
 * Created by wy641 on 2017/10/25.
 */
$(function () {
    checkLoginStatus();
});
var USER_INFO = JSON.parse(sessionStorage.getItem('userInfo'));
function checkLoginStatus() {
    $.ajax({
        type: "POST",
        url: "/checkLogin",
        dataType: "json",
        success: function (data) {
            if(data.type == 2){
                sessionStorage.setItem('userInfo',JSON.stringify(data.userData));
                $('.log-sign-div').html('<a href="/userDetail" class="user-nick-name">'+data.userData.nickName+'</a>，你好');
            }
            $('.log-sign-div').show();
        }
    });
}