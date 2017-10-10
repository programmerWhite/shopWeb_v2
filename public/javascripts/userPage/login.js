/**
 * Created by wy641 on 2017/10/9.
 */
$(function(){
   $('input').off().on('focus',function(){
        $('.error-notice').text("");
   });
});