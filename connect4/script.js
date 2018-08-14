(function() {
    var curPlayer = "player1";
    var curColor = "red";
    var slot = $(".slot");
    var matchindex;
    var doNothingFlag = false;
    $(".fall").css("background-color", curColor);
    $(".column").on("click", function(e) {
        var slotsInCol = $(e.currentTarget).find(slot);
        for (var i = 5; i >= 0; i--) {
            if (!slotsInCol.eq(i).hasClass("player1")) {
                if (!slotsInCol.eq(i).hasClass("player2")) {
                    doNothingFlag = false;
                    break;
                }
            } else {
                doNothingFlag = true;
            }
        }
        if (!doNothingFlag) {
            slotsInCol.eq(i).addClass(curPlayer);
            var curfall = $(e.currentTarget).find(".fall");
            var curhole = slotsInCol.eq(i).find(".hole");
            var offsetY = curhole.offset().top - 78;
            console.log("holeoffset", offsetY);
            curfall.css("background-color", curColor);
            curfall.css("visibility", "visible");
            var translatey = "translateY(" + offsetY + "px)";
            curfall.css("transform", translatey);
            if (checkForVictory(slotsInCol)) {
                for (i = matchindex; i < matchindex + 4; i++) {
                    var holeCur = slotsInCol.eq(i).children();
                    fadeHole(holeCur);
                }
                return showVictoryMessage();
            } else {
                var slotsInRow = $(".row" + i);
                if (checkForVictory(slotsInRow)) {
                    for (i = matchindex; i < matchindex + 4; i++) {
                        holeCur = slotsInRow.eq(i).children();
                        fadeHole(holeCur);
                    }
                    return showVictoryMessage();
                } else {
                    if (checkDiagonalVictory()) {
                        return showVictoryMessage();
                    }
                }
            }
            switchPlayers();
        }
    });
    $(".fall").on("transitionend", function() {
        $(".fall").css("visibility", "hidden");
        $(".fall").css("transform", "translateY(0)");
    });
    function checkForVictory(numSlot) {
        var winCheck = "";
        for (var i = 0; i < numSlot.length; i++) {
            if (numSlot.eq(i).hasClass(curPlayer)) {
                winCheck += "y";
            } else {
                winCheck += "n";
            }
        }
        matchindex = winCheck.indexOf("yyyy");
        return matchindex > -1;
    }

    function checkDiagonalVictory() {
        // descendingDiagonalCheck
        var diagArray = [];
        var numCols = $(".column").length;
        var numRows = $(".column").find(".slot").length / numCols;
        for (var i = 3; i < numRows; i++) {
            for (var j = 3; j < numCols; j++) {
                if (
                    $("#column" + j)
                        .find(".slot")
                        .eq(i)
                        .hasClass(curPlayer) &&
                    $("#column" + (j - 1))
                        .find(".slot")
                        .eq(i - 1)
                        .hasClass(curPlayer) &&
                    $("#column" + (j - 2))
                        .find(".slot")
                        .eq(i - 2)
                        .hasClass(curPlayer) &&
                    $("#column" + (j - 3))
                        .find(".slot")
                        .eq(i - 3)
                        .hasClass(curPlayer)
                ) {
                    // pushing diagonal elements of the winning game
                    diagArray.push(
                        $("#column" + j)
                            .find(".slot")
                            .eq(i)
                    );
                    diagArray.push(
                        $("#column" + (j - 1))
                            .find(".slot")
                            .eq(i - 1)
                    );
                    diagArray.push(
                        $("#column" + (j - 2))
                            .find(".slot")
                            .eq(i - 2)
                    );
                    diagArray.push(
                        $("#column" + (j - 3))
                            .find(".slot")
                            .eq(i - 3)
                    );

                    //setting a fade to it
                    for (var d = 0; d < diagArray.length; d++) {
                        console.log("in fade");
                        var holeCur = diagArray[d].children();
                        fadeHole(holeCur);
                    }
                    return true;
                }
            }
        }
        // ascendingDiagonalCheck
        for (i = 3; i < numRows; i++) {
            for (j = 0; j < numCols - 3; j++) {
                if (
                    $("#column" + j)
                        .find(".slot")
                        .eq(i)
                        .hasClass(curPlayer) &&
                    $("#column" + (j + 1))
                        .find(".slot")
                        .eq(i - 1)
                        .hasClass(curPlayer) &&
                    $("#column" + (j + 2))
                        .find(".slot")
                        .eq(i - 2)
                        .hasClass(curPlayer) &&
                    $("#column" + (j + 3))
                        .find(".slot")
                        .eq(i - 3)
                        .hasClass(curPlayer)
                ) {
                    diagArray.push(
                        $("#column" + j)
                            .find(".slot")
                            .eq(i)
                    );
                    diagArray.push(
                        $("#column" + (j + 1))
                            .find(".slot")
                            .eq(i - 1)
                    );
                    diagArray.push(
                        $("#column" + (j + 2))
                            .find(".slot")
                            .eq(i - 2)
                    );
                    diagArray.push(
                        $("#column" + (j + 3))
                            .find(".slot")
                            .eq(i - 3)
                    );
                    console.log("diagArray:", diagArray.length);
                    for (var n = 0; n < diagArray.length; n++) {
                        console.log("in fade");
                        holeCur = diagArray[n].children();
                        fadeHole(holeCur);
                        console.log(diagArray[n]);
                    }
                    return true;
                }
            }
        }
    }
    function fadeHole(holetoFade) {
        holetoFade.fadeIn(1500, function() {
            holetoFade.css("border", "7px solid white");
        });
        //holetoFade.fadeTo(100, 0.1).fadeTo(200, 1.0);
    }
    function showVictoryMessage() {
        var modalDlg = $("#modalmsg");
        var modalText = $(".textmodal").find("p");
        var winnerTxt = "Hurrah! " + curPlayer + " " + modalText.text();
        $(".column").off("click");
        modalText.text(winnerTxt);
        modalDlg.css("visibility", "visible");
        modalDlg.show();
        console.log("Hurrah! " + curPlayer + " Wins!");
    }

    function switchPlayers() {
        if (curPlayer == "player1") {
            curPlayer = "player2";
            curColor = "yellow";
        } else {
            curPlayer = "player1";
            curColor = "red";
        }
    }
    $(".closemodal").click(function() {
        $("#modalmsg").remove();
    });
    $(".newgame").click(function() {
        location.reload();
    });
    $(document).ready(function() {
        $(".dot").hide();
        $("#one")
            .delay(1000)
            .fadeIn(500);
        $("#two")
            .delay(1500)
            .fadeIn(500);
        $("#three")
            .delay(2000)
            .fadeIn(500);
        $("#four")
            .delay(2500)
            .fadeIn(500);
    });
})(); //end of iife
