(function() {
    var box = $("#box");
    $.ajax({
        url: "/links.json",
        success: function(linksdata) {
            var htmlStr = "";
            for (var i = 0; i < linksdata.links.length; i++) {
                console.log(linksdata.links[i].href);
                htmlStr +=
                    '<a class="news" href="' +
                    linksdata.links[i].href +
                    '">' +
                    linksdata.links[i].text +
                    "</a>";
            }
            box.append(htmlStr);
            if (linksdata) {
                animateTicker();
            }
        }
    });

    function animateTicker() {
        console.log("inside function!");
        var animId;
        var initSpaceBoxLeft = box.offset().left;

        var spaceBoxLeft = initSpaceBoxLeft;
        var newsList = $("a");
        var numNews = newsList.length - 1;
        var widthLastItem = $("a")
            .eq(numNews)
            .text().length;
        console.log("wid:" + box.outerWidth() + " wid2" + widthLastItem);
        var totalWidth = box.outerWidth() - box.offset().left;

        function move() {
            if (spaceBoxLeft >= -1 * totalWidth) {
                console.log("space:" + totalWidth);
                spaceBoxLeft--;
                var boxleft = spaceBoxLeft + "px";
                box.css("left", boxleft);
            } else {
                spaceBoxLeft = initSpaceBoxLeft;
            }
            animId = requestAnimationFrame(move);
        }
        move();
        box.on("mouseenter", function(e) {
            e.stopPropagation();
            cancelAnimationFrame(animId);
        });

        box.on("mouseleave", function() {
            if (animId) {
                cancelAnimationFrame(animId);
            }
            move();
        });
    }
})();
