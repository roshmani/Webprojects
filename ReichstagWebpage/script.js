/* Reichstag javascript */
(function() {
    var menuElem = document.getElementById("menuimg");
    menuElem.addEventListener("click", function(e) {
        e.stopPropagation();
        document.body.classList.add("menu-on");
    });
    var closeelem = document.querySelector(".menuclose");
    function menuClose() {
        document.body.classList.remove("menu-on");
    }
    closeelem.addEventListener("click", function(e) {
        e.stopPropagation(e);
        menuClose();
    });
    document.body.addEventListener("click", function(e) {
        e.preventDefault();
        menuClose();
    });
})();
