(function() {
    var curPlayer = "player1";
    var curColor = "red";
    var slot = $(".slot");

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
            var offsetY = curhole.offset().top - 15;
            curfall.css("background-color", curColor);
            curfall.css("visibility", "visible");
            var translatey = "translateY(" + offsetY + "px)";
            curfall.css("transform", translatey);
            if (checkForVictory(slotsInCol)) {
                return showVictoryMessage();
            } else {
                var slotsInRow = $(".row" + i);
                if (checkForVictory(slotsInRow)) {
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
        return winCheck.indexOf("yyyy") > -1;
    }

    function checkDiagonalVictory() {
        // descendingDiagonalCheck
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
                )
                    return true;
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
                    return true;
                }
            }
        }
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
})(); //end of iife
