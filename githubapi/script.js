Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

///*****************************************************************************************/
var username = "";
var password = "";
var usernametosearch = "";
var baseUrl = "https://api.github.com";
$("button").on("click", function(e) {
    username = $('input[name="username"]').val();
    password = $('input[name="password"]').val();
    usernametosearch = $('input[name="usernamesearch"]').val();
    e.preventDefault();
    var endpoint = "/users/" + usernametosearch + "/repos";
    console.log(usernametosearch);
    $.ajax({
        url: baseUrl + endpoint,
        headers: {
            Authorization: "Basic " + btoa(username + ":" + password)
        },
        success: function(gitData) {
            $("#reposdiv").html(
                Handlebars.templates.getrepo({
                    gitData: gitData
                })
            );
        }
    });
    /*} else {
            alert("Please Input the user name to search!");
        }*/
});

$(document).on("click", ".repo-item", function(e) {
    e.preventDefault();

    var repoName;
    //get the closest repo-item element and find its corresponding div
    var commitdiv = $(e.target)
        .closest(".repo-item")
        .find("div");

    if (
        $(e.target)
            .closest(".repo-item")
            .hasClass("clicked")
    ) {
        commitdiv.toggle();
    } else {
        $(e.target)
            .closest(".repo-item")
            .addClass("clicked");
        if (e.target.id == "reponame") {
            repoName = $(e.target).text();
        } else {
            var getpelem = $(e.target)
                .closest(".repo-item")
                .find("p");
            repoName = getpelem.text();
        }
        var endpoint = "/repos/" + repoName + "/commits";
        $.ajax({
            url: baseUrl + endpoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(commitData) {
                var numCommit = commitData.length;
                commitData = commitData.slice(numCommit - 10, numCommit);
                commitdiv.html(
                    Handlebars.templates.getcommitmsg({
                        commitData: commitData
                    })
                ); //.html end
                commitdiv.css("visibility", "visible");
            } // success function
        }); //ajax
    }
});
