(function() {
    var resultheader = "";
    var nextUrl = "";
    var baseurl = "https://elegant-croissant.glitch.me/spotify";
    $("#submit-button").on("click", function() {
        var htmlStr = "";
        var userInput = $("input").val();
        var selType = $("select").val();
        resultheader = "Results for the search for" + " " + userInput + ":";
        $("#resultheader").text(resultheader);
        $("#resultheader").css("visibility", "visible");
        $.ajax({
            url: baseurl,
            data: {
                query: userInput,
                type: selType
            },
            success: function(artistData) {
                artistData = artistData.artists || artistData.albums;
                /*var nextUrl =
                    artistData.next &&
                    artistData.next.replace(
                        "spotify url",
                        "elegant-croissant url"
                    );*/
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
                    spotifyUrl = artistData.items[i].external_urls["spotify"];
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
                $(".results").html(htmlStr);
            } //function:success
        }); //.ajax
    }); //on.click
})(); //iife
