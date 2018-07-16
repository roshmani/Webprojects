/*Write a function that inserts an element into the body of the currently loaded page.
That element should have fixed position, z-index of 2147483647, left of 20px, top of 100px,
font-size of 200px, and contain the text 'AWESOME'.*/
//-------------------------------------------------------------------------------------------
function insertElements(element) {
    var newElement = document.createElement(element);
    document.body.appendChild(newElement);
    newElement.innerHTML = "AWESOME";
    newElement.style.position = "fixed";
    newElement.style.zIndex = "2147483647";
    newElement.style.left = "20px";
    newElement.style.top = "100px";
    newElement.style.fontSize = "200px";
}

insertElements("block");
