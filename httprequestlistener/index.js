/*Require the http module*/
const http = require("http");
const fs = require("fs");
/*Use the createServer method of that module to create your server.*/
const server = http.createServer();
server.on("request", (request, response) => {
    //error handling
    request.on("error", err => console.log("Error from Request! ", err));
    response.on("error", err => console.log("Error from response! ", err));
    /*The request object will have method, url, and headers properties.*/
    console.log(
        "request url:",
        request.url + "\n" + "method:",
        request.method + "\n" + "request headers:",
        request.headers
    );
    let body = "";
    request.on("data", function(chunk) {
        body += chunk;
    });

    if (request.method == "GET" || request.method == "HEAD") {
        response.setHeader("Content-Type", "text/html");
        response.statusCode = 200;
    }
    if (request.method == "GET") {
        console.log("get");
        response.write(`<!doctype html>
                        <html>
                            <title>Hello World!</title>
                            <p>Hello World!</p>
                        </html>`);
        response.end();
    } else if (request.method == "POST") {
        console.log("post");
        response.statusCode = 302;
        response.setHeader("Location", "/");
        let body = "";
        request
            .on("data", function(chunk) {
                body += chunk;
            })
            .on("end", function() {
                console.log(body); //logs the entire request body
                response.end();
            });
    } else if (request.method == "HEAD") {
        console.log("head");
        response.end();
    } else {
        response.statusCode = 405;
        response.end();
    }
    let logMsg = [
        new Date(),
        request.method,
        request.url,
        request.headers["user-agent"],
        "\n"
    ].join("\t");
    fs.appendFile(__dirname + "/requests.txt", logMsg, err => {
        if (err) {
            console.log(err);
        } else {
            console.log('The "data to append" was appended to file!');
        }
    });
});
/* You can pass a request listener (a function that handles requests) to that function.*/
server.listen(8080, () => console.log("Listening on local host...."));
