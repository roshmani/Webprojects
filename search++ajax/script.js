(function() {
    var input = $("input");
    var results = $(".results");
    var listHtml = "";
    var result;
    var matchArr = [];
    var jqXHR, timerId;

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

    input.on("input", function(e) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(requestCountries, 250);
        function requestCountries() {
            if (jqXHR) {
                jqXHR.abort();
            }

            jqXHR = $.ajax({
                url: "https://flame-egg.glitch.me/",
                data: {
                    q: e.target.value
                },
                success: function(data) {
                    if (data.length > 0) {
                        console.log(data);
                        listHtml = "";
                        for (var j = 0; j < data.length; j++) {
                            listHtml +=
                                '<div class="result">' + data[j] + "</div>";
                        }
                        populateList();
                    } else {
                        listHtml = "";
                        listHtml += '<div class="result">no results' + "</div>";
                        populateList();
                    }
                }
            });
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
