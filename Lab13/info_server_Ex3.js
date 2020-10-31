var express = require('express');
var app = express();
var myParser = require("body-parser"); 

app.use(myParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path);
    next();
});

app.post("/process_form", function (request, response) {
    console.log("YAY! Got POST Process Form ")
    let POST = request.body;
    response.send(POST);
});



app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

