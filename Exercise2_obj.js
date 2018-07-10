/* Copy the following object into your code:
var a = {
    Berlin: 'Germany',
    Paris: 'France',
    'New York': 'USA'
};
Then create a new empty object b and use a for..in loop to iterate over all of a's properties. Give b properties whose names are the values from a and whose values are the property names from a. The result should be an object that looks like this:

{
    Germany: 'Berlin',
    France: 'Paris',
    USA: 'New York'
}

*/
//------------------------------------------------------------------------------------------------------------------
var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA"
};
var b = {};
for (var key in a) {
    b[a[key]] = key;
}
console.log(b);
