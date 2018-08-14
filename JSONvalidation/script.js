(function() {
    var textareaVal = "";
    var textarea = $(".textset");
    var buttonElem = $("#validate");
    var result = $("#result");
    buttonElem.on("click", function() {
        try {
            textareaVal = textarea.val();
            if (textareaVal.length != 0) {
                var obj = JSON.parse(textareaVal);
                if (obj.length != 0) {
                    result.text("This is a valid JSON String");
                }
            }
        } catch (e) {
            result.text("This is an invalid JSON String!");
        }
    });
})();
