(function() {
    $(document).ready(function() {
        populateOnLoad();
        console.log("populate text area");
    });
    var textarea = $(".textset");
    var textareaVal = "";
    textarea.on("input", function() {
        textareaVal = $(this).val();
        if (textareaVal.length != 0) {
            localStorage.setItem("textareaVal", textareaVal);
        }
    });
    $(window).focus(function() {
        populateOnLoad();
        console.log("populate text area on coming back");
    });
    function populateOnLoad() {
        var textvalstored;
        try {
            textvalstored = localStorage.getItem("textareaVal");
            textarea.val(textvalstored);
        } catch (e) {
            console.log("Exception Occured!", e);
        }
    }
})();
