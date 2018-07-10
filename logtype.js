/*
Write a function named logType that expects a single argument and logs a different string depending on the type/value of the argument that is passed to it. The string it logs should be one of the following:
"undefined!"
"null!"
"number!"
"not a number!"
"string!"
"boolean!"
"function!"
"object!"
"array!"
"I have no idea!" */

//----------------------------------------------------------------------------------------------------------------------------------------------------------

function LogType(arg) {
    var type = typeof arg;
    if (isNaN(arg) === true && type === "number") {
        console.log("not a number!");
    } else if (arg === null) {
        console.log("null!");
    } else if (Array.isArray(arg) === true) {
        console.log("array!");
    } else {
        console.log('"' + type + '!"');
    }
}
var x;
var nn = NaN;
LogType("hello");
LogType({});
LogType([10, 20, 30]);
LogType(null);
LogType(true);
LogType(x);
LogType(function f() {});
LogType(nn);
