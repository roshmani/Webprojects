const fs = require("fs");
const { promisify } = require("util");
let filepath = __dirname + "/files";
let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);
let allPromises = [];
readdir(filepath)
    .then(function(files) {
        files.forEach(file => {
            allPromises.push(
                stat(filepath + "/" + file).then(function(stats) {
                    if (stats.isDirectory()) {
                        console.log(filepath + "/" + file + " is a directory");
                    } else {
                        console.log(
                            filepath + "/" + file + " is not a directory"
                        );
                    }
                })
            ); //stat
        }); //forEach
        Promise.all(allPromises).then(function() {
            console.log("Done!");
        });
    })
    .catch(function(err) {
        // handle error
        console.log("Error Occured!", err);
    });
