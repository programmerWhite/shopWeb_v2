/**
 * Created by Raintree on 2017/1/3.
 */
//    var div = document.createElement('div');
////是否支持触摸事件
//    var supportTouch = 'ontouchstart' in div;
////是否支持方向转换事件
//    var supportOtc = 'onorientationchange' in window;
//
//    var supportClick  = 'onclick' in window;
//
//alert("touch--"+supportTouch);
//alert("direction change--"+supportOtc);
//alert("click--"+supportClick);

var innerDiv = document.getElementById('innerDiv');
var outerDiv = document.getElementById('outerDiv');
for(var i=0;i<100;i++){
    var newNode = document.createElement('p');
    var textNode = document.createTextNode(i);
    newNode.style.margin = '0px';
    newNode.appendChild(textNode);
    innerDiv.appendChild(newNode);
}

/** Event handler for mouse wheel event.
 *鼠标滚动事件
 */
var wheel = function(event) {
    var delta = 0;
    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
    } else if (event.detail) {
        /** Mozilla case. */
        /** In Mozilla, sign of delta is different than in IE.
         * Also, delta is multiple of 3.
         */
        delta = -event.detail / 3;
    }
    /** If delta is nonzero, handle it.
     * Basically, delta is now positive if wheel was scrolled up,
     * and negative, if wheel was scrolled down.
     */
    if (delta)
        handle(delta);
    /** Prevent default actions caused by mouse wheel.
     * That might be ugly, but we handle scrolls somehow
     * anyway, so don't bother here..
     */
    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}

/** Initialization code.
 * If you use your own event management code, change it as required.
 */
if (window.addEventListener) {
    /** DOMMouseScroll is for mozilla. */
    outerDiv.addEventListener('DOMMouseScroll', wheel, false);
}
/** IE/Opera. */
outerDiv.onmousewheel = outerDiv.onmousewheel = wheel;

/** This is high-level function.
 * It must react to delta being more/less than zero.
 */
var handle = function(delta) {
    if (delta < 0) {
        innerDiv.style.top = (parseInt(innerDiv.style.top)+(-Math.pow(delta,2))*40)+"px";

        if(outerDiv.offsetHeight - innerDiv.offsetHeight > parseInt(innerDiv.style.top)){
            innerDiv.style.borderRadius = '100px';
            setTimeout(function(){
                innerDiv.style.borderRadius = '10px';
                innerDiv.style.top = (outerDiv.offsetHeight - innerDiv.offsetHeight)+"px";
            },300)
        }
        console.log("鼠标滑轮向下滚动：" + delta + "次！"); // 1
        return;
    } else {
        innerDiv.style.top = (parseInt(innerDiv.style.top)+Math.pow(delta,2)*40)+"px";

        if(parseInt(innerDiv.style.top) > 0){
            innerDiv.style.borderRadius = '100px';
            setTimeout(function(){
                innerDiv.style.borderRadius = '10px';
                innerDiv.style.top = '0px';
            },300)
        }
        console.log("鼠标滑轮向上滚动：" + delta + "次！"); // -1
        return;
    }
}