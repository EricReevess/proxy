window.onload = function() {
  let wrap = document.querySelector(".wrap");
  let cube = document.querySelector(".cube");
  let cover = document.querySelector(".cover");
  let tip = document.querySelector(".tip > span")
  let cubeFace = document.querySelectorAll(".cube-face")

  let keydownPosX;
  let keydownPosY;
  let currentDegX = 0;
  let currentDegY = 0;
  let stopDegX = 20;
  let stopDegY = -30;
  let timer;

  cubeFace.forEach(elem => {
      elem.addEventListener("animationend", function(ev) {
          ev.stopPropagation();
      })
  })

  if (/(Macintosh|iPhone|Android)/i.test(navigator.userAgent)) {
      tip.innerHTML = `使用 <i class="fa fa-hand-point-down" aria-hidden="true"></i> 滑动可旋转立方体`;

      timer = setInterval(function() {
          stopDegX += .2;
          cube.style.transform = `rotateX(${stopDegY}deg) rotateY(${stopDegX}deg)`;
          // if (stopDegX == 405) {
          //     clearInterval(timer);
          // }
      }, 16)

      cover.addEventListener("touchstart", touchstart)
      cover.addEventListener("touchend", touchend)


      function touchstart(ev) {
          clearInterval(timer);
          cubeFace[1].textContent = ":D"
          keydownPosX = ev.touches[0].screenX;
          keydownPosY = ev.touches[0].screenY;

          cover.addEventListener("touchmove", touchmove);
      }

      function touchend(ev) {
          stopDegX += currentDegX
          stopDegY += currentDegY
          currentDegX = 0;
          currentDegY = 0;
          cover.removeEventListener("touchmove", drag);
          cube.style.transform = `rotateX(${stopDegY}deg) rotateY(${stopDegX}deg)`;
      }

      function touchmove(ev) {
          ev.preventDefault();
          console.log();

          currentDegX = (ev.touches[0].screenX - keydownPosX) / 3;
          currentDegY = -(ev.touches[0].screenY - keydownPosY) / 3;

          cube.style.transform = `rotateX(${stopDegY + currentDegY}deg) rotateY(${stopDegX + currentDegX}deg)`;
      }


      if (/(Macintosh|iPhone)/i.test(navigator.userAgent)) {
          cube.children[4].style.transform = "rotateY(180deg) translateZ(0px)";
      }
  } else {
      tip.innerHTML = `使用 <i class="fa fa-mouse-pointer" aria-hidden="true"></i> 可旋转立方体`;


      timer = setInterval(function() {
          stopDegX += .2;
          cube.style.transform = `rotateX(${stopDegY}deg) rotateY(${stopDegX}deg)`;
      }, 16)

      cover.addEventListener("mousedown", mousedown)
      cover.addEventListener("mouseup", mouseup)
      cover.addEventListener("mouseout", mouseup)



      function mousedown(ev) {
          clearInterval(timer);
          cubeFace[1].textContent = ":D"
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
