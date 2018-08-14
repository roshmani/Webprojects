const fs = require("fs");

module.exports.readDirectories = function() {
    let filepath = __dirname + "\\projects";
    let listFiles = fs.readdirSync(filepath);

    let htmlStr = `<!DOCTYPE html>
                        <html>
                            <title>My awesome projects</title>
                            <ul>`;
    listFiles.forEach(dir => {
        htmlStr +=
            '<li><a href="' +
            "/" +
            dir +
            "/" +
            'index.html">' +
            dir +
            "</a></li>";
    });
    htmlStr += "</ul></html>";
    console.log("html string:", htmlStr);
    return htmlStr;
};
