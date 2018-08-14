const http = require("http");
const fs = require("fs");
const path = require("path");
const newmodule = require("./projectlinks.js");

const contentType = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    json: "application/json",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml"
};

const server = http.createServer();
server.on("request", (request, response) => {
    request.on("error", err => console.log("Error from Request! ", err));
    response.on("error", err => console.log("Error from response! ", err));
    if (request.method != "GET") {
        response.statusCode = 405;
        return response.end();
    }
    if (request.url === "/") {
        let htmlstr = newmodule.readDirectories();
        response.statusCode = 200;
        response.write(htmlstr);
        response.end();
    } else {
        const myPath = path.normalize(__dirname + "/projects" + request.url);
        console.log(myPath);
        if (!myPath.startsWith(__dirname + "\\projects")) {
            response.statusCode = 403;
            return response.end();
        }
        fs.stat(myPath, function(err, stats) {
            if (err) {
                response.statusCode = 404;
                return response.end();
            } else {
                if (stats.isFile()) {
                    serveFile(myPath);
                } else {
                    let filePath = myPath;
                    if (!request.url.endsWith("/")) {
                        response.statusCode = 302;
                        response.setHeader("Location", request.url + "/");
                        return response.end();
                    }
                    response.statusCode = 200;
                    filePath += "index.html";
                    serveFile(filePath);
                    //or if it ends with a slash serve the index.html from the dir.*/
                }
            }
        });
        function serveFile(filePath) {
            let ext = path.extname(filePath).replace(".", "");
            response.setHeader("Content-Type", contentType[ext]);
            const readStr = fs.createReadStream(filePath);
            readStr.pipe(response);
            readStr.on("error", err => {
                response.statusCode = 500;
                response.end();
            });
        }
    }
});

server.listen(8080, () => console.log("Listening on local host port 8080...."));
