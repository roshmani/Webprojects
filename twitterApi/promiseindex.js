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
            return Promise.all([
                getTweet(bearerToken, "nytimes"),
                getTweet(bearerToken, "BBCNews"),
                getTweet(bearerToken, "CNN")
            ])
                .then(function(tweetarr) {
                    let tweets = Array.prototype.concat.apply([], tweetarr);
                    //console.log("tweetarray:", tweetarr);
                    console.log("tweet array has:", tweets.length);
                    tweets.sort(function(a, b) {
                        return new Date(a.created_at) - new Date(b.created_at);
                    });
                    //console.log("tweetarraysorted:", tweetarr);
                    return tweets;
                })
                .then(function(tweets) {
                    console.log("Tweets before filter call:", tweets);
                    response.json({ links: filterTweets(tweets) });
                });
        })

        .catch(function(err) {
            console.log("Error occured!", err);
        });
});
app.listen(8080, () => ca.rainbow("listening on port 8080"));
