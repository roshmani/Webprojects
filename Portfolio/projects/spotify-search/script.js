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
(function() {
    var resultheader = "";
    var nextUrl = "";
    var initUrl = "https://elegant-croissant.glitch.me/spotify";
    var baseurl = "";
    var spotifyNext = "";
    var htmlStr = "";
    var infinitescroll = location.search.indexOf("scroll=infinite") > -1;
    var loadmore = $("#loadmore");
    $("#submit-button").on("click", function(e) {
        baseurl = initUrl;
        fetchData(e.currentTarget);
    }); //submit .on.click

    loadmore.on("click", function(e) {
        baseurl = nextUrl;
        fetchData(e.currentTarget);
    }); // load more on click

    function fetchData(curTarget) {
        htmlStr = "";
        var userInput = $("input").val();
        var selType = $("select").val();
        if (userInput.length > 0) {
            resultheader = "Results for the search for" + " " + userInput + ":";
            $.ajax({
                url: baseurl,
                data: {
                    query: userInput,
                    type: selType
                },
                success: function(artistData) {
                    artistData = artistData.artists || artistData.albums;
                    //console.log("data:", artistData);
                    for (var i = 0; i < artistData.items.length; i++) {
                        //console.log("data", artistData.items[i]);
                        var artistname = artistData.items[i].name;
                        var imgUrl = "imagesinger.jpg";
                        var imgHeight = "200px";
                        var imgWidth = "200px";
                        var spotifyUrl = "";
                        if (artistData.items[i].images.length > 0) {
                            imgUrl = artistData.items[i].images[0].url;
                        }
                        spotifyUrl =
                            artistData.items[i].external_urls["spotify"];
                            artistData.items.map(function(){
                                artistData=[{name:getnamefrom fetchData
                                external_urls}]
                            });
                        htmlStr +=
                            "<a href=" +
                            spotifyUrl +
                            '><div class="result-item"><img id="artistimg" src=' +
                            imgUrl +
                            ' alt="singer_albumimg" height=' +
                            imgHeight +
                            " width=" +
                            imgWidth +
                            ' ><p class="artistName">' +
                            artistname +
                            "</p></div></a>";
                    } //for loop

                    if (curTarget.id == "submit-button") {
                        $(".results").html(htmlStr);
                    } else {
                        $(".results").append(htmlStr);
                    }
                    getNextUrl(artistData);

                    if (htmlStr === "") {
                        resultheader += " No results";
                    } //if empty
                    $("#resultheader").text(resultheader);
                    $("#resultheader").css("visibility", "visible");
                } //function:success
            }); //.ajax
        } else {
            alert("Please enter artist or album name!");
        }
    } // function end

    function getNextUrl(data) {
        // getting the next url
        spotifyNext = data.next;
        if (spotifyNext !== null) {
            nextUrl =
                initUrl +
                spotifyNext.substring(
                    spotifyNext.indexOf("?"),
                    spotifyNext.length
                );
            if (!infinitescroll) {
                loadmore.css("visibility", "visible");
            } else {
                loadmore.css("visibility", "hidden");
                checkScrollPos();
            }
        } else {
            loadmore.css("visibility", "hidden");
        }
    } //getNextUrl

    function checkScrollPos() {
        var topScroll = $(document).scrollTop(); //how much scrolled
        var pageHeight = $(document).height(); // page Height
        var windowHeight = $(window).height();
        var scrollPos = topScroll + windowHeight;
        if (scrollPos >= pageHeight - 10) {
            if (spotifyNext != null) {
                baseurl = nextUrl;
                fetchData(loadmore);
            }
        } else {
            setTimeout(checkScrollPos, 600);
        }
    }
})(); //iife
