/*Make a page that has on it an element that is 100px by 100px in size,
 has absolute positioning, and has a solid background color.
 Add an event handler that makes this box center itself directly under
 the user's mouse pointer as it is moved across the screen.*/

//----------------------------------------------------------------------

var boxelem = document.getElementById("box");
document.addEventListener("mousemove", function(e) {
    var boxWidth = boxelem.offsetWidth;
    boxelem.style.left = e.screenX - boxWidth / 2 + "px";
    boxelem.style.top = e.screenY - boxWidth + "px";
});
