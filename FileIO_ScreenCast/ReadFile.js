var fs = require('fs'); //you must require the filesystem package

var filename = "info.dat"; // var filename in order to avoid problems when changing a var name
if (fs.existsSync(filename)) { //Checks to see if file exists
    data = fs.readFileSync(filename, 'utf-8');
    console.log("Success! We got:" + data);
} else {
    console.log("Sorry bud. File" + filename + "does not exist");
}


