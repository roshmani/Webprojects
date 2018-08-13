const https = require("https");
const { consumerKey, consumerSecret } = require("./secret.json");
module.exports.getBearerToken = function(cb) {
    let authString = consumerKey + ":" + consumerSecret;
    let encAuthStr = new Buffer(authString).toString("base64");

    var options = {
        host: "api.twitter.com",
        path: "/oauth2/token",
        headers: {
            Authorization: `Basic ${encAuthStr}`,
            "content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        //This is what changes the request to a POST request
        method: "POST"
    };

    let callback = function(response) {
        var str = "";
        response.on("data", function(chunk) {
            str += chunk;
        });
        if (response.statusCode != 200) {
            cb(new Error(response.statusCode));
            return;
        }
        response.on("end", function() {
            let bearerToken = JSON.parse(str).access_token;
            cb(null, bearerToken);
        });
    };

    var req = https.request(options, callback);
    //This is the data we are posting, it needs to be a string or a buffer
    req.write("grant_type=client_credentials");
    req.end();
};

module.exports.getTweets = function(bearerToken, screenName, cb) {
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
        host: "api.twitter.com",
        path:
            "/1.1/statuses/user_timeline.json?screen_name=" +
            screenName +
            "&count=20",
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    };

    let callback = function(response) {
        var str = "";

        //another chunk of data has been recieved, so append it to `str`
        response.on("data", function(chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on("end", function() {
            let tweets = JSON.parse(str);
            //console.log("returned in tweets:headline:", newsObj);
            cb(null, tweets);
        });
    };

    https.request(options, callback).end();
};

module.exports.filterTweets = function(tweets) {
    let links = [];
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].entities.urls.length == 1) {
            links.push({
                text: tweets[i].text.replace(
                    tweets[i].entities.urls[0].url,
                    ""
                ),
                href: tweets[i].entities.urls[0].url
            });
        }
    }
    return links;
};
