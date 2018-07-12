/*Write a function that expects a number as a parameter. If the value that is passed in is less than 0, equal to 0, or not a number, the function should return the string 'ERROR'. If the number that is passed in is greater than or equal to 1000000 it should simply return the number. Otherwise it should multiply the number by 10 however many times it takes to get a number that is greater than or equal to 1000000 and return that.*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
var checkNumber = function(num) {
    if (num < 0 || num == 0 || isNaN(num) === true) {
        return "ERROR!";
    } else if (num >= 1000000) {
        return num;
    } else {
        return checkNumber((num *= 10));
    }
};

checkNumber(1000);
