window.onload = function() {
            let wrap = document.querySelector(".wrap");
            let cube = document.querySelector(".cube");
            let cover = document.querySelector(".cover");

            let keydownPosX;
            let keydownPosY;
            let currentDegX = 0;
            let currentDegY = 0;
            let stopDegX = 20;
            let stopDegY = -15;
            if (/(Macintosh|iPhone|Android)/i.test(navigator.userAgent)) {

                cover.addEventListener("touchstart", touchstart)
                cover.addEventListener("touchend", touchend)

                function touchstart(ev) {
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

                    currentDegX = (ev.touches[0].screenX - keydownPosX);
                    currentDegY = -(ev.touches[0].screenY - keydownPosY);

                    cube.style.transform = `rotateX(${stopDegY + currentDegY}deg) rotateY(${stopDegX + currentDegX}deg)`;
                }


                if (/(Macintosh|iPhone)/i.test(navigator.userAgent)) {
                    cube.children[4].style.transform = "rotateY(180deg) translateZ(0px)";
                }
            } else {
                // cube.addEventListener("mousedown", mousedown)
                // cube.addEventListener("mouseup", mouseup)
                // cube.addEventListener("mouseout", mouseup)
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
