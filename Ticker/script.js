(function() {
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
        requestAnimationFrame(move);
    }
    move();
})();
