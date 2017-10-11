/**
 * Created by Raintree on 2017/10/10.
 */
/**
 * Created by Raintree on 2017/5/27.
 */
function Regex_tool(){

}

Regex_tool.prototype.firstName = function (string) {
    //var reg='^[a-zA-Z/]{1}[/a-zA-Z0-9 ]{2,19}$';
    var reg = new RegExp(/^[/ a-zA-Z]{0,19}$/);
    if(reg.test(string)){
        return true;
    }else{
        return false;
    }
};

Regex_tool.prototype.lastName = function (string) {
    // var reg='^[a-zA-Z/]{1}[/a-zA-Z0-9]{2,19}$';
    var reg = new RegExp(/^[/ a-zA-Z]{0,19}$/);
    if(reg.test(string)){
        return true;
    }else{
        return false;
    }
};

Regex_tool.prototype.loginName = function (string) {
    var reg = new RegExp(/^[a-zA-Z0-9]{1,19}$/);
    if(reg.test(string)){
        return true;
    }else{
        return false;
    }
};

Regex_tool.prototype.parentLoginName = function (string) {
    var reg = new RegExp(/^[a-zA-Z0-9]{0,19}$/);
    if(reg.test(string)){
        return true;
    }else{
        return false;
    }
};

Regex_tool.prototype.password = function (string) {
    if(string.length > 6 && string.length < 20 && string.indexOf(" ") == -1){
        return true;
    }else{
        return false;
    }
};

Regex_tool.prototype.email = function (string) {

    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!!reg.test(string)) {
        return true;
    } else {
        return false;
    }
};
