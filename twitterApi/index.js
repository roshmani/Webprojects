const express = require("express");
const app = express();
const ca = require("chalk-animation");
const { getBearerToken, getTweets, filterTweets } = require("./module");
app.use(express.static("public"));
app.get("/links.json", (request, response) => {
    getBearerToken(function(err, bearerToken) {
        if (err) {
            console.log("Error from Bearer Token", err);
            return;
        }
        getTweets(bearerToken, function(err, tweets) {
            if (err) {
                console.log("Error on tweets", err);
                return;
            } else {
                response.json({ links: filterTweets(tweets) });
            }
        });
    });
});
app.listen(8080, () => ca.rainbow("listening on port 8080"));
