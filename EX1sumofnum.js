/*Write a function that takes any number of numbers as parameters and returns the sum of those numbers.
sum(5, 10); //15

sum(5, 10, 15); //30;

sum(5, 10, 15, 100, 200); //330*/
//------------------------------------------------------------------------------------------------------------------
function sumOfNumbers() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    console.log(sum);
}

sumOfNumbers(10, 20);
sumOfNumbers(10, 20, 30);
sumOfNumbers(10, 20, 30, 40);
