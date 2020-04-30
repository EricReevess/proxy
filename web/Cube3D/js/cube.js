window.onload = function() {
    let wrap = document.querySelector(".wrap");
    let cube = document.querySelector(".cube");
    let cover = document.querySelector(".cover");
    let tip = document.querySelector(".tip > span")
    
    
    let keydownPosX;
    let keydownPosY;
    let currentDegX = 0;
    let currentDegY = 0;
    //设置一个初始的旋转角度
    let stopDegX = 45;
    let stopDegY = -30;

    // 针对移动端使用一套js，其中触摸数据是使用ev中的touches内部属性
    if (/(Macintosh|iPhone|Android)/i.test(navigator.userAgent)) {
        tip.innerHTML = `使用 <i class="fa fa-hand-point-down" aria-hidden="true"></i> 滑动可旋转立方体`;

        cover.addEventListener("touchstart", touchstart)
        cover.addEventListener("touchend", touchend)

        function touchstart(ev) {
            keydownPosX = ev.touches[0].screenX;
            keydownPosY = ev.touches[0].screenY;
            //在手指按下屏幕时，触发时间记录按下的位置，移动后，触发触摸移动事件
            cover.addEventListener("touchmove", touchmove);
        }

        function touchend(ev) {
            //由于本人太菜了，不会获取立方体当前transform中所旋转的角度，所以只能使用stopDegX/Y 2个变量来存储上次的旋转角度:D
            //当手指停止触摸时触发的事件，stopDegX/Y记录下最后旋转的角度，并清零当前旋转值，并移除鼠标移动事件
            stopDegX += currentDegX
            stopDegY += currentDegY
            currentDegX = 0;
            currentDegY = 0;
            cover.removeEventListener("touchmove", drag);
            cube.style.transform = `rotateX(${stopDegY}deg) rotateY(${stopDegX}deg)`;
        }

        function touchmove(ev) {
            //在移动事件内取消掉触摸屏幕产生的滚动条 默认事件
            ev.preventDefault();
            //currentDegX 记录当前X和Y轴划过的距离,除以三减慢滑动的速度
            currentDegX = (ev.touches[0].screenX - keydownPosX) / 3;
            currentDegY = -(ev.touches[0].screenY - keydownPosY) / 3;
            // 最后将上次移动的角度加上当前移动的角度相加，并设置CSS样式    
            cube.style.transform = `rotateX(${stopDegY + currentDegY}deg) rotateY(${stopDegX + currentDegX}deg)`;
        }

        //这里解决iOS平台浏览器Safari中的一个bug，需要单独调整样式
        if (/(Macintosh|iPhone)/i.test(navigator.userAgent)) {
            cube.children[4].style.transform = "rotateY(180deg) translateZ(0px)";
        }
    } else {
        //PC端使用的js代码
        tip.innerHTML = `使用 <i class="fa fa-mouse-pointer" aria-hidden="true"></i> 可旋转立方体`;

        cover.addEventListener("mousedown", mousedown)
        cover.addEventListener("mouseup", mouseup)

        function mousedown(ev) {
            keydownPosX = ev.offsetX;
            keydownPosY = ev.offsetY;
            cover.addEventListener("mousemove", drag);
        }

        function mouseup(ev) {
            stopDegX += currentDegX
            stopDegY += currentDegY
            currentDegX = 0;
            currentDegY = 0;
            cover.removeEventListener("mousemove", drag);
            cube.style.transform = `rotateX(${stopDegY}deg) rotateY(${stopDegX}deg)`;
        }

        function drag(ev) {
            currentDegX = (ev.offsetX - keydownPosX) / 3;
            currentDegY = -(ev.offsetY - keydownPosY) / 3;
            cube.style.transform = `rotateX(${stopDegY + currentDegY}deg) rotateY(${stopDegX + currentDegX}deg)`;
        }
    }
}
