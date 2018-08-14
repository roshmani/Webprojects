(function() {
    var kitties = document.getElementsByClassName("kitty");
    var dots = document.getElementsByClassName("dot");
    var numPics = kitties.length;
    var currkitty = 0;
    var timer;
    var isTransitionOn = false; //flag for checking if it is doing something already
    var touchstart, touchend, idx;
    function moveKitties(next) {
        kitties[currkitty].classList.remove("onscreen");
        kitties[currkitty].classList.add("exit");
        dots[currkitty].classList.remove("active");
        isTransitionOn = true;
        if (isNaN(next)) {
            currkitty++;
            if (currkitty >= numPics) {
                currkitty = 0;
            }
        } else {
            console.log("next:" + next);
            currkitty = next;
        }
        kitties[currkitty].classList.add("onscreen");
        dots[currkitty].classList.add("active");
    }
    document.addEventListener("transitionend", function endTrans(e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            e.target.removeEventListener("transitionend", endTrans);
            isTransitionOn = false;
            timer = setTimeout(moveKitties, 2500);
        }
    });

    [].slice.call(dots).forEach(function(dot, i) {
        dot.addEventListener("click", function() {
            console.log("click called");
            if (currkitty == i) {
                console.log("on same image");
                return;
            } else if (isTransitionOn == true) {
                console.log("on transition");
                return;
            } else {
                console.log("clear for click");
                clearTimeout(timer);
                moveKitties(i);
            }
        });
    });
    var curImg = [].slice.call(kitties);
    console.log(curImg);
    /*Testing touch events*/
    for (idx = 0; idx < curImg.length; idx++) {
        console.log(curImg[idx] + " " + idx);
        curImg[idx].addEventListener("touchstart", handleStart, false);
        curImg[idx].addEventListener("touchend", handleEnd, false);
    }
    function handleStart(evt) {
        evt.preventDefault();
        touchstart = evt.changedTouches[0].screenX;
        console.log("touchstart:" + evt.target + "at:" + touchstart);
    }
    function handleEnd(evt) {
        evt.preventDefault();
        touchend = evt.changedTouches[0].screenX;
        console.log("touchend:" + evt.target + "at:" + touchend);
        clearTimeout(timer);
        console.log("touchstart:" + touchstart);
        if (touchstart < touchend) {
            if (idx > 0) {
                idx -= 1;
                console.log("index:prev:" + idx);
            } else {
                idx = 3;
            }
            moveKitties(idx);
        } else {
            if (idx < 3) {
                idx += 1;
                console.log("index:next:" + idx);
            } else {
                idx = 0;
            }
            moveKitties(idx);
        }
    }

    setTimeout(moveKitties, 2500);
})();
