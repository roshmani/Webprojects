/*Make a page that has on it an element that is 100px by 100px in size
and has a solid black border. When the user mouses down on this box,
 its background should change to a randomly selected color. When the
 user mouses up on it,
its background should change to another randomly selected color.*/
//----------------------------------------------------------------------
function getRandomColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16); // gets random color in hex
    return randomColor;
}

var getBox = document.getElementById("box");
getBox.addEventListener("mousedown", function() {
    var randColor = "#" + getRandomColor();
    getBox.style.backgroundColor = randColor;
});

getBox.addEventListener("mouseup", function() {
    var randColor = "#" + getRandomColor();
    getBox.style.backgroundColor = randColor;
});
