/*Write a function called invertCase that expects a string as a parameter.
This function should return a new string with all the same characters as
the string that was passed in but with the cases of the alphabetic characters
switched. Uppercase characters should become lowercase and
lowercase letters should become uppercase.
Characters that are not alphabetic should not change. */
//--------------------------------------------------------------------------
function invertCase(stringarg) {
    var stringarr = stringarg.split("");
    var newStr = "";
    stringarr.forEach(function(character) {
        if (character == character.toUpperCase()) {
            newStr += character.toLowerCase();
        } else {
            newStr += character.toUpperCase();
        }
    });

    return newStr;
}

invertCase("aBcDeF");
