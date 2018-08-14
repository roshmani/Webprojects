(function() {
    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Angola",
        "Anguilla",
        "Antigua",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire (Netherlands Antilles)",
        "Bosnia Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo, The Democratic Republic of",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Curacao (Netherlands Antilles)",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iraq",
        "Ireland (Republic of)",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kosrae Island",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia (FYROM)",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Moldova",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Ponape",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Rota",
        "Russia",
        "Rwanda",
        "Saba (Netherlands Antilles)",
        "Saipan",
        "Samoa",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St. Barthelemy",
        "St. Croix",
        "St. Eustatius (Netherlands Antilles)",
        "St. John",
        "St. Kitts and Nevis",
        "St. Lucia",
        "St. Maarten (Netherlands Antilles)",
        "St. Thomas",
        "St. Vincent and the Grenadines",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Tinian",
        "Togo",
        "Tonga",
        "Tortola",
        "Trinidad and Tobago",
        "Truk",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos",
        "Tuvalu",
        "US Virgin Islands",
        "Uganda",
        "Ukraine",
        "Union Island",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Virgin Gorda",
        "Wallis and Futuna",
        "Yap",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];
    var input = $("input");
    var results = $(".results");
    var matchArr = [];
    var listHtml = "";
    var result;

    //hide the list on load
    $(document).ready(function() {
        results.hide();
    });

    //input event
    input.focus(function() {
        populateList();
    }); //focus end

    function populateList() {
        results.html(listHtml);
        result = $(".result");
        results.show();
    }
    input.on("input", function() {
        var inputVal = $(this)
            .val()
            .toLowerCase();
        if (inputVal.length != 0) {
            matchArr.length = [];
            for (var i = 0; i < countries.length; i++) {
                if (matchArr.length < 4) {
                    if (countries[i].toLowerCase().indexOf(inputVal) == 0) {
                        matchArr.push(countries[i]);
                    } //end of countries match}
                } else {
                    break;
                } //end of size check
            } //end of for loop
            listHtml = "";
            for (var j = 0; j < matchArr.length; j++) {
                listHtml += '<div class="result">' + matchArr[j] + "</div>";
            }
            populateList();
        } else {
            results.empty();
            results.hide();
        }
    });

    //blur function on inputfield
    input.blur(function() {
        results.empty();
        results.hide();
    });

    // event delegation
    $(document).on("mouseover", ".result", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var targetElem = $(e.target);
        var prevHighlight = targetElem.siblings();
        prevHighlight.removeClass("highlighted");
        targetElem.addClass("highlighted");
    });
    function addSelected(targetElem) {
        if (targetElem == "Enter") {
            targetElem = result.siblings(".highlighted");
        }
        input.val(targetElem.text());
        results.empty();
        results.hide();
    }

    $(document).on("mousedown", ".result", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var targetElem = $(e.target);
        addSelected(targetElem);
    });

    function highlightOnkeyPress(addRemIdx, next) {
        var highlight = "";
        highlight = result.siblings(".highlighted");
        if (highlight.length === 0) {
            result.eq(addRemIdx).addClass("highlighted");
        }
        if (next == "next") {
            highlight.next().addClass("highlighted");
        } else {
            highlight.prev().addClass("highlighted");
        }
        highlight.removeClass("highlighted");
    }

    $(document).on("keydown", "input", function(e) {
        var targetElem = "Enter";
        if (e.which == 13) {
            e.preventDefault();
            addSelected(targetElem);
        } else if (e.which == 38) {
            //up arrow
            e.preventDefault();
            console.log("keypress triggered up");
            highlightOnkeyPress(3, "prev");
        } else if (e.which == 40) {
            //down arrow
            e.preventDefault();
            console.log("keypress triggered down");
            highlightOnkeyPress(0, "next");
        }
    });
})();
