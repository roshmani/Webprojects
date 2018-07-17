/*Make a page that has on it an element that is 200px by 200px in size and has a
 solid background color. Nest within that element another element that is 50px by
  50px in size and has a different solid background color. When the user clicks on
   the outer element its background color should change to a randomly selected color.
    However, if the user clicks on the inner element, the inner element's background
    color should change to a randomly selected background color but the outer element's
    background color should not change at all.*/

//----------------------------------------------------------------------
function getRandomColor() {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // gets random color in hex
    return randomColor;
}

var bigBox = document.getElementById("bigbox");
bigBox.addEventListener("click", function(e) {
    e.stopPropagation();
    bigBox.style.backgroundColor = getRandomColor();
});

var smallBox = document.getElementById("smallbox");
smallBox.addEventListener("click", function(e) {
    e.stopPropagation();
    smallBox.style.backgroundColor = getRandomColor();
});
