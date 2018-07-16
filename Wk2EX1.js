/*Write a function that expects a string representing a selector
to be passed as a parameter. The function should find all the elements
in the document that match the selector and change their style
so that the text they contain is italic, underlined, and bold.*/
function changeStyling(selectorarg) {
    var elems = document.querySelectorAll(selectorarg);
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.fontStyle = "italic";
        elems[i].style.textDecoration = "underline";
        elems[i].style.fontWeight = "bold";
    }
}

changeStyling("section");
