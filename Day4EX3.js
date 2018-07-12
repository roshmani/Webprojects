/*Write a function called getLessThanZero that expects an array of numbers to be passed to it
and returns a new array containing only those numbers from the array that was passed in that are
less than zero.

  getLessThanZero([1, 2, -1, -90, 10]); //[-1, -90]
  getLessThanZero([1, 2]); //[]*/
//--------------------------------------------------------------------------------------------------------------------
function getLessThanZero(arrNum) {
    var posArr = [];
    arrNum.forEach(function(item) {
        if (item < 0) {
            posArr.push(item);
        }
    });
    return posArr;
}

getLessThanZero([1, 2, -1, -90, 10]); //[-1, -90]
getLessThanZero([1, 2]); //[]*/
