const fs = require("fs");

function readDirectories(filepath) {
    fs.readdir(filepath, (err, listFiles) => {
        if (err) {
            console.log(err);
            process.exit();
        } else {
            traverseFiles(listFiles, filepath);
        }
    });
}

function traverseFiles(listofFiles, filepath) {
    console.log(filepath + " contains " + listofFiles);
    listofFiles.forEach(file => {
        fs.stat(filepath + "/" + file, function(err, stats) {
            if (err) {
                process.exit();
            } else {
                if (stats.isDirectory() === true) {
                    readDirectories(filepath + "/" + file);
                }
            }
        });
    });
}
readDirectories(__dirname + "/files");
