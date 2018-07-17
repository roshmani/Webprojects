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

    var linkelems = document.getElementsByClassName('news');
    var boxelem= document.getElementById('box');

    Array.prototype.forEach.call(linkelems, function(link) {
      link.addEventListener("mouseenter", function() {
          cancelAnimationFrame(animId);
          link.style.textDecoration = "underline";
          link.style.color = "blue";
      });
    });
           boxelem.addEventListener("mouseleave", function() {
            move();
        });

})();
