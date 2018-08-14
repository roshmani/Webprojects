const chalk = require("chalk");
const http = require("http");
const querystring = require("querystring");
const server = http.createServer();
server.on("request", (request, response) => {
    if (request.method != "GET" && request.method != "POST") {
        response.statusCode = 405;
        response.end();
    }
    if (request.method == "GET") {
        response.write(`<!doctype html>
                        <html>
                         <title>Colors</title>
                         <form method="POST">
                             <input type="text" name="text">
                             <select name="color">
                                 <option value="red">red</option>
                                 <option value="blue">blue</option>
                                 <option value="green">green</option>
                                 <option value="yellow">yellow</option>
                                 <option value="gray">gray</option>
                                 <option value="magenta">magenta</option>
                                 <option value="cyan">cyan</option>
                             </select>
                             <button type="submit">Go</button>
                         </form>
                        </html> `);
        response.end();
    } else if (request.method == "POST") {
        console.log("in post");
        let body = "";
        request
            .on("data", function(chunk) {
                body += chunk;
            })
            .on("end", function() {
                let queryStr = querystring.parse(body);
                let chalkcol = chalk[queryStr.color];
                console.log(chalkcol(queryStr.text));
                response.write(`<!doctype html>
                                 <html>`);
                response.write("<title>" + queryStr.text + "</title>");
                response.write(
                    '<a href="/" style="color:' +
                        queryStr.color +
                        '">' +
                        queryStr.text +
                        "</a>"
                );
                response.write("</html>");
                response.end();
            });
    }
});
/* You can pass a request listener (a function that handles requests) to that function.*/
server.listen(8080, () => console.log("Listening on local host...."));
