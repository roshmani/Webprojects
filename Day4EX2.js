/*Write a function that takes an array as a parameter and returns a new array
containing all of the items that are in the array that was passed in but in reverse order.
 Unlike the reverse method that all arrays have, this function should leave the original array unchanged.*/
//--------------------------------------------------------------------------------------------------------

function reverseArray(arr) {
    if (Array.isArray(arr) == true) {
        var arrCopy = arr.slice();
        return arrCopy.reverse();
    } else {
        return "Not an array!";
    }
}

reverseArray([1, 2, 3]);
reverseArray("a");
