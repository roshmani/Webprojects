(function() {
    var kitties = document.getElementsByClassName("kitty");
    var dots = document.getElementsByClassName("dot");
    var numPics = kitties.length;
    var currkitty = 0;
    var timer;
    var isTransitionOn = false; //flag for checking if it is doing something already
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
                console.log("same");
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
    setTimeout(moveKitties, 2500);
})();
