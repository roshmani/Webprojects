const fs = require("fs");

function addFileProps(filepath) {
    let dirObj = {};
    let fileList = fs.readdirSync(filepath);
    fileList.forEach(file => {
        let stats = fs.statSync(filepath + "/" + file);
        if (stats.isFile()) {
            dirObj[file] = stats.size;
        } else {
            dirObj[file] = addFileProps(filepath + "/" + file);
        }
    });
    return dirObj;
}

function writeFile() {
    let objDir = addFileProps(__dirname + "/files");
    let jsonStr = JSON.stringify(objDir);
    fs.writeFile(__dirname + "/files.json", jsonStr, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Write file was successful!");
        }
    });
}

writeFile();
