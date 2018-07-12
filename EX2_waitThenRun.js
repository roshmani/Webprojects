/*Write a function that takes another function as a parameter.
It should wait 1.5 seconds and then run the function that was passed in.
waitThenRun(function() {
    console.log('Hello!');
}); // logs 'Hello!' 1.5 seconds later

waitThenRun(function() {
    console.log('Goodbye!');
}); // logs 'Goodbye!' 1.5 seconds later*/
//--------------------------------------------------------------------------------------------------------------------------------------
function hello() {
    console.log("Hello!");
}

function goodbye() {
    console.log("Goodbye!");
}

function waitThenRun(callbackarg) {
    setTimeout(callbackarg, 1500);
}

waitThenRun(hello);
waitThenRun(goodbye);
