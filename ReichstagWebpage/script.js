/* Reichstag javascript */
(function() {
    var menuElem = document.getElementById("menuimg");
    menuElem.addEventListener("click", function(e) {
        e.stopPropagation();
        document.body.classList.add("menu-on");
    });
    var closeelem = document.getElementById("closeicon");
    function menuClose() {
        document.body.classList.remove("menu-on");
    }
    console.log(closeelem);
    closeelem.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log("close button event");
        menuClose();
    });
    document.body.addEventListener("click", function(e) {
        e.preventDefault();
        menuClose();
    });
    var menuHolder = document.getElementsByClassName("menuclose")[0];
    menuHolder.addEventListener("click", function(e) {
        e.stopPropagation();
    });
})();
