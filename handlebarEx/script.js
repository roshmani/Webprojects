////**************************set up for handle bar*****************************************************

Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});
//*******************************************************************************************************
var authorArr = [
    {
        name: "Kahlil Gibran",
        born: 1883,
        died: 1931,
        selectedWritings: ["The Prophet", "Sand and Foam", "The Earth Gods"],
        quote:
            "We live only to discover beauty. All else is a form of waiting.",
        photo:
            "https://upload.wikimedia.org/wikipedia/commons/8/87/Khalil_Gibran.jpg"
    },
    {
        name: "Oscar Wilde",
        born: 1854,
        died: 1900,
        selectedWritings: [
            "The Picture of Dorian Gray",
            "The Importance of Being Earnest",
            "De Profundis"
        ],
        quote:
            "The bureaucracy is expanding to meet the needs of the expanding bureaucracy.",
        photo:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oscar_Wilde_Sarony.jpg/800px-Oscar_Wilde_Sarony.jpg"
    },
    {
        name: "Sylvia Plath",
        born: 1932,
        died: 1963,
        selectedWritings: ["The Bell Jar", "Ariel"],
        quote:
            "To the person in the bell jar, blank and stopped as a dead baby, the world itself is a bad dream.",
        photo:
            "https://upload.wikimedia.org/wikipedia/commons/d/d0/Sylvia_Plath.jpg"
    }
];

document.getElementById("authorsdiv").innerHTML = Handlebars.templates.authors({
    authors: authorArr
});
