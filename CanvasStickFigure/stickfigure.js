/*Drawing a stick figure*/
//var mainCanvas = document.getElementById("Maincanvas");
var canvaschild = document.getElementById("Subcanvas");
canvaschild.style.border = "2px solid black";
var cvs = canvaschild.getContext("2d");
//tell canvas what color of pen to choose
cvs.strokeStyle = "#e542f4";
cvs.beginPath(); //ready to draw
cvs.arc(300, 100, 50, 0, 2 * Math.PI);
cvs.stroke(); // actually draws a line
//trunk
cvs.beginPath();
cvs.moveTo(300, 150);
cvs.lineTo(300, 400);
cvs.stroke();
//arm1-left
cvs.beginPath();
cvs.moveTo(300, 170);
cvs.lineTo(200, 300);
cvs.stroke();
//arm2-right
cvs.beginPath();
cvs.moveTo(300, 170);
cvs.lineTo(400, 300);
cvs.stroke();
//leg1-left
cvs.strokeStyle = "green";
cvs.beginPath();
cvs.moveTo(300, 400);
cvs.lineTo(200, 550);
cvs.stroke();
//leg2-right
cvs.beginPath();
cvs.moveTo(300, 400);
cvs.lineTo(400, 550);
cvs.stroke();
