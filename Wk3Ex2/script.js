/*Write a function askForNumber that uses prompt to ask the user for a number between one and ten.
 It should check the result and if it is not a number between 1 and 10 it should
 throw an error with the message "not a valid number". Otherwise, it should return the number the user entered.
 Then, write a second function translateNumberToGerman that calls askForNumber and
 returns the German translation of that number as a string. If askForNumber throws an error,
 it should print the error's message to the console and prompt the user again.
To restate this a bit differently:
The process is started by calling translateNumberToGerman. It is translateNumberToGerman that calls askForNumber.
askForNumber should call prompt and, depending on what prompt returns, either return a number or throw an exception.
If askForNumber returns a number, translateNumberToGerman should return a string (a German translation of the number).
If askForNumber throws an exception, translateNumberToGerman should catch that exception and restart the process.*/
//****************************************************************************************************************************
(function() {
    function askForNumber() {
        try {
            var input = prompt("Enter a Number Between 1 and 10:");
            var numInput = parseInt(input);
            if (numInput > 0 && numInput <= 10) {
                return input;
            } else {
                throw "not a valid number!";
            }
        } catch (e) {
            throw e;
        }
    }

    function translateNumberToGerman() {
        try {
            var result = askForNumber();
            var numGerman = {
                "1": "eins",
                "2": "zwei",
                "3": "drei",
                "4": "vier",
                "5": "fünf",
                "6": "sechs",
                "7": "sieben",
                "8": "acht",
                "9": "neun",
                "10": "zehn"
            };
            console.log(numGerman[result]);
        } catch (e) {
            console.log(e);
            translateNumberToGerman();
        }
    }
    translateNumberToGerman();
})();
