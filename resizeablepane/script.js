(function() {
    var sliderid = $(".slider");
    var mousedownFlag = false;
    var container = $("#resizeablewrapper");
    var img1Id = $("#img1");
    var img2Id = $("#img2");
    sliderid.on("mousedown", function(e) {
        e.preventDefault();
        mousedownFlag = true;
        container.on("mousemove", function(e) {
            e.preventDefault();
            if (mousedownFlag == true) {
                var sliderWidth = sliderid.outerWidth();
                var containerOffset = container.offset().left;
                var containerWidth = container.outerWidth();
                var minLeft = containerOffset + 5;
                var maxLeft =
                    containerOffset + containerWidth - sliderWidth - 5;
                var calcLeft = e.pageX - container.offset().left - sliderWidth;

                if (calcLeft < minLeft) {
                    calcLeft = minLeft;
                } else if (calcLeft > maxLeft) {
                    calcLeft = maxLeft;
                }
                calcLeft += "px";
                sliderid.css("left", calcLeft);
                sliderid.css("right", 0);
                img2Id.css("width", calcLeft);
            }
            return false;
        });
        return false;
    });

    $(document).on("mouseup", function() {
        container.off("mousemove");
    });
})();
