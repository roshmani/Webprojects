(function() {
    var curPlayer = "player1";
    var curColor = "red";
    var slot = $(".slot");

    var doNothingFlag = false;
    var diagonals = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ];
    $(".fall").css("background-color", curColor);
    $(".column").on("click", function(e) {
        var slotsInCol = $(e.currentTarget).find(slot);
        console.log($(".slot"));
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
                console.log("colVictory");
                return showVictoryMessage();
            } else {
                var slotsInRow = $(".row" + i);
                if (checkForVictory(slotsInRow)) {
                    console.log("rowVictory");
                    return showVictoryMessage();
                } else {
                    if (checkDiagonalVictory()) {
                        console.log("diagVictory");
                        return showVictoryMessage();
                    }
                }
            }
            switchPlayers();
        }
        $(".fall").on("transitionend", function() {
            $(".fall").css("visibility", "hidden");
            $(".fall").css("transform", "translateY(0)");
        });
    });
    function checkForVictory(numSlot) {
        var winCheck = "";
        for (var i = 0; i < numSlot.length; i++) {
            if (numSlot.eq(i).hasClass(curPlayer)) {
                console.log("row", i);
                winCheck += "y";
            } else {
                winCheck += "n";
            }
        }
        return winCheck.indexOf("yyyy") > -1;
    }

    function checkDiagonalVictory() {
        var winCheck = "";
        for (var i = 0; i < diagonals.length; i++) {
            for (var j = 0; j < diagonals[i].length; j++) {
                if (slot.eq(diagonals[i][j]).hasClass(curPlayer)) {
                    console.log("diag", diagonals[i][j]);
                    winCheck += "y";
                } else {
                    winCheck += "n";
                }
            }
        }
        return winCheck.indexOf("yyyy") > -1;
    }
    function showVictoryMessage() {
        var modalDlg = $("#modalmsg");
        var modalText = $(".textmodal").find("p");
        var winnerTxt = "Hurrah! " + curPlayer + " " + modalText.text();
        $(".column").off("click");
        modalText.text(winnerTxt);
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
