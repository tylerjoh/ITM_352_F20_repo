var express = require('express');
var app = express();
var myParser = require("body-parser");
var session = require('express-session');
var products_data = require('./products.json');
var querystring = require('querystring');
var products_data = require('./products.json');
const { request } = require('http');
var fs = require('fs');
var qs = require('querystring');
var session = require('express-session');
const { response, query } = require('express');
var cookieParser = require("cookie-parser"); //set variable to bring in library


var input_quantities = []; // For users that inputted quantities for products

app.use(cookieParser());

app.use(myParser.urlencoded({ extended: true }));
app.use(session({secret: "ITM352 rocks!"}));

app.all('*', function (request, response, next) {
    if(typeof request.session.cart == 'undefined') { request.session.cart = {}; } 
    console.log(request.session.cart);
    console.log(`Got a ${request.method} to path ${request.path}`);
    // need to initialize an object to store the cart in the session. We do it when there is any request so that we don't have to check it exists
    // anytime it's used
    next();
});



app.post("/get_products_data", function (request, response) {
    response.json(products_data);
});

app.get("/add_to_cart", function (request, response) {
    var products_key = request.query['products_key']; // get the product key sent from the form post
    var quantities = request.query['quantities'].map(Number); // Get quantities from the form post and convert strings from form post to numbers
    request.session.cart[products_key] = quantities; // store the quantities array in the session cart object with the same products_key. 
    response.redirect('./cart.html');
});

app.get("/get_cart", function (request, response) {
    response.json(request.session.cart);
});

app.post("/", function (request, response) {
    response.cookie('cart', request.body).redirect("./cart.html"); //sets cookie to have key of “cart” and value of the request which would be the data passed in from the post request
});






app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));