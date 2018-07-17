(function() {
    var animId;
    var box = document.getElementById("box");
    var initSpaceBoxLeft = box.offsetLeft;
    var spaceBoxLeft = initSpaceBoxLeft;
    var newsList = document.querySelectorAll("a");
    var lastIndex = newsList.length - 1;
    var widthLastItem = newsList[lastIndex].offsetWidth;
    var totalWidth = widthLastItem + box.offsetWidth;
    function move() {
        if (spaceBoxLeft >= -totalWidth) {
            spaceBoxLeft--;
            box.style.left = spaceBoxLeft + "px";
        } else {
            spaceBoxLeft = initSpaceBoxLeft;
        }
        animId = requestAnimationFrame(move);
    }
    move();
    var linkelems = document.querySelectorAll("a");
    for (var i = 0; i < linkelems.length; i++) {
        linkelems[i].addEventListener("mouseenter", function() {
            cancelAnimationFrame(animId);
            //linkelems[i].style.textDecoration = "underline";
            //linkelems[i].style.color = "blue";
        });
    }

    for (var j = 0; j < linkelems.length; j++) {
        linkelems[j].addEventListener("mouseleave", function() {
            move();
        });
    }
})();
