/* Reichstag javascript */
(function() {
    //click even for opening the menu
    var menuElem = document.getElementById("menuimg");
    menuElem.addEventListener("click", function(e) {
        e.stopPropagation();
        document.body.classList.add("menu-on");
    });
    var closeelem = document.getElementById("closeicon");
    function menuClose() {
        document.body.classList.remove("menu-on");
    }
    //click event for closing the menu by clicking on x button
    closeelem.addEventListener("click", function(e) {
        e.stopPropagation();
        menuClose();
    });
    //click event for closing the menu by cliking on the page outside menu
    document.body.addEventListener("click", function(e) {
        e.preventDefault();
        menuClose();
    });
    //e.stopPropagation() on the immediate parent to prevent bubbling
    var menuHolder = document.getElementsByClassName("menu")[0];
    menuHolder.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    $(document).ready(function() {
        setTimeout(function() {
            var modalDlg = $("#modalmsg");
            modalDlg.show();
        }, 1000);
    });
    $(".closemodal").click(function() {
        $("#modalmsg").remove();
    });
})();
