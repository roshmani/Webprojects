const express = require("express");
const app = express();
const ca = require("chalk-animation");
const fs = require("fs");
app.use(require("cookie-parser")());
app.use(
    require("body-parser").urlencoded({
        extended: false
    })
); // used in POST requests
const basicAuth = require("basic-auth");
const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

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
app.use(express.static("static"));
app.get("/cookie", (request, response) => {
    response.send(`
               <h3> Please Accept Cookies to proceed!</h3>
               <form method='POST' action='/cookie'>
                   <label>Privacy Policy- accept cookies to proceed<input type="checkbox" name="acceptcookie" value="Agreement to accept"/></label>
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

let projectList = fs.readdirSync(__dirname + "/projects");
const projlist = projectList.map(dir => {
    const { title, desc } = require(__dirname +
        "/projects/" +
        dir +
        "/info.json");
    return {
        dir,
        title,
        desc
    };
});

app.get("/portfolio", function(request, response) {
    response.render("welcome", {
        projectlist: projlist
    });
});
app.get("/projects/:projectName", function(request, response) {
    //loop through the array and find project Projname-request.params
    let projname = request.params.projectName;
    let title,
        desc,
        noprojflag = false;
    for (let i = 0; i < projectList.length; i++) {
        if (projname === projectList[i]) {
            title = projlist[i].title;
            desc = projlist[i].desc;
            noprojflag = true;
            break;
        } else {
            noprojflag = false;
        }
    }
    if (noprojflag === false) {
        console.log("No such project");
    }
    response.render("projectdescription", {
        projectList: projectList,
        projname: projname,
        title: title,
        desc: desc
    });
});

app.listen(8080, () => ca.rainbow("listening on port 8080..."));
