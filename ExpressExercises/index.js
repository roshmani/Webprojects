const express = require("express");
const app = express();
const ca = require("chalk-animation");
app.use(require("cookie-parser")());
app.use(
    require("body-parser").urlencoded({
        extended: false
    })
); // used in POST requests

const basicAuth = require("basic-auth");
var auth = function(req, res, next) {
    var creds = basicAuth(req);
    if (!creds || creds.name != "discoduck" || creds.pass != "opensesame") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};
app.use("/Carousel", auth);
//check for cookies --- yes then redirect to cookie and then save the url in cookie if redirect (is not / cookie redirect (request.url)
app.use((request, response, next) => {
    if (!request.cookies.accepted && request.url != "/cookie") {
        response.cookie("requestUrl", request.url);
        response.redirect("/cookie");
    } else {
        next();
    }
});

app.use(express.static("projects"));

app.get("/cookie", (request, response) => {
    response.send(`
               <h3> Please Accept Cookies to proceed!</h3>
               <form method='POST' action='/cookie'>
                   <label>Agreed to accept cookies<input type="checkbox" name="acceptcookie" value="Agreement to accept"/></label>
                   <button type='submit'>submit</button>
                </form>
                       `);
});
app.post("/cookie", (request, response) => {
    if (request.body.acceptcookie) {
        response.cookie("accepted", true);
        response.redirect(request.cookies.requestUrl);
    } else {
        response.redirect("/cookie");
    }
});
app.listen(8080, () => ca.rainbow("listening on port 8080..."));
