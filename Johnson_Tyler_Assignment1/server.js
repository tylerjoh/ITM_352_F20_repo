const querystring = require('querystring');
var express = require('express'); //code for server
var myParser = require("body-parser"); //code for server
var products = require("public/product_data.json"); //accessing data from javascript file

app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));