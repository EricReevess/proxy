window.onload = function() {
  let home = document.querySelector(".home");
  let btns = document.querySelectorAll(".btn:not(.home)")
  let flag = true;
  home.addEventListener('click', function() {
      if (flag) {
          this.style.transform = "rotate(-180deg)"
          btns.forEach((elem, index) => {
              let pos = getPoint(120, index * 90 / (btns.length - 1));
              elem.style.transitionDelay = index / 20 + "s"
              elem.style.left = pos.left + "px"
              elem.style.top = pos.top + "px"
              elem.style.transform = "scale(1) rotate(360deg)";
              elem.style.opacity = 1;
              elem.addEventListener("click", function() {
                  this.style.transition = ".2s"
                  this.style.transform = "scale(1.3) rotate(360deg)";
                  this.style.opacity = .8
                  this.addEventListener("transitionend", function fun() {
                      this.style.transition = "all .7s cubic-bezier(0.535, 0.220, 0.235, 1.000)"
                      this.style.transform = "scale(1) rotate(360deg)";
                      this.style.opacity = 1;
                      this.removeEventListener("transitionend", fun) //清楚过渡结束事件监听器，否则会监听所有结束的过渡
                  })
              })

          })
      } else {
          this.style.transform = "rotate(180deg)"
          btns.forEach((elem, index) => {
              elem.style.transitionDelay = (btns.length - 1 - index) / 20 + "s"
              elem.style.left = 0
              elem.style.top = 0
              elem.style.transform = "scale(.6) rotate(-360deg)";
              elem.style.opacity = 0;
          })
      }
      flag = !flag
  })
  getPoint = (edge, deg) => {
      let x = Math.round(edge * Math.sin(deg * Math.PI / 180))
      let y = Math.round(edge * Math.cos(deg * Math.PI / 180))
      return {
          left: -x,
          top: -y
      }
  }
}
