const { promisify } = require("util");
const express = require("express");
const app = express();
const ca = require("chalk-animation");
const { getBearerToken, getTweets, filterTweets } = require("./module");
app.use(express.static("public"));
const getToken = promisify(getBearerToken);
const getTweet = promisify(getTweets);

app.get("/links.json", (request, response) => {
    getToken()
        .then(function(bearerToken) {
            return getTweet(bearerToken);
        })
        .then(function(tweets) {
            response.json({ links: filterTweets(tweets) });
        })
        .catch(function(err) {
            console.log("Error occured!", err);
        });
});
app.listen(8080, () => ca.rainbow("listening on port 8080"));
