// -- Server Page -- //
// Referenced from my Assignment 2, Lab 13, 14, and 15, as well as Dan Port's Assignment 3 Examples.
// Also Referenced Stack Exchange and W3Schools

//Define variables
var express = require('express');
var app = express();
var myParser = require("body-parser");
var session = require('express-session');
var products_data = require('./products.json');
var nodemailer = require('nodemailer');
var qs = require('querystring');
var qstr = {};
var sticker_qty = {};
fs = require('fs');
var filename = 'user_data.json'

app.use(myParser.urlencoded({ extended: true }));
app.use(session({ secret: "ITM352 rocks!" }));

app.all('*', function (request, response, next) {
   // need to initialize an object to store the cart in the session. We do it when there is any request so that we don't have to check it exists
   // anytime it's used
   if (typeof request.session.cart == 'undefined') { request.session.cart = {}; }
   next();
});


app.get("/get_products_data", function (request, response) {
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

if (fs.existsSync(filename)) {
   stats = fs.statSync(filename) //gets the stats of your file
   data = fs.readFileSync(filename, 'utf-8'); //Reads the file and returns back with data and then continues with code as requested.
   users_reg_data = JSON.parse(data); //Parses data in order to turn string into an object
}

// gets to login page
app.get("/login.html", function (request, response) {
   str = `
     <html lang="en">
     <link href="stylesheet.css" rel="stylesheet">

     <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Login</title>
        <link href="stylesheet.css" rel="stylesheet">

     </head>

     <h1>Landon's Sticker Shop</h1>

     <h2>Login to proceed to checkout!</h2>

     <body>
        <form name="loginform" method="POST">
           <div>
              <input type="text" name="username" size="40" placeholder="Username"><br />
              <input type="password" name="password" size="40" placeholder="Password"><br />
              <input type="submit" value="login" id="submit"> </div>
        </form>
     </body>

     <h2>Click below to create an account!</h2>

     <body>
        <div>
           <form action="./registration.html">
              <input type="submit" value="Register Here" id="regpage" name="register_here">
           </form>
        </div>

     </body>

     </html>
  `;
   response.send(str);
});

app.post("/login.html", function (request, response) {
   console.log(sticker_qty);
   the_username = request.body.username.toLowerCase(); //makes username case insensitive
   //Validate login data
   if (typeof users_reg_data[the_username] != 'undefined') {   //To check if the username exists in the json data
      if (users_reg_data[the_username].password == request.body.password) {
         theQuantQuerystring = qs.stringify(sticker_qty); //make the query string of prod quant needed for invoice
         response.redirect('/invoice.html?' + theQuantQuerystring + `&username=${the_username}`); //Adds username & quantity to invoice
      }
      else {
         response.send('Invalid Login: Please hit the back button and try again 1'); //if password isn't equal to password existing in jsonn data, show error message

      }
   } else {
      response.send('Invalid Login: Please hit the back button and try again 2');
   }
});

// Process registration form POST method and redirect to invoice page if ok or back to registration page if not
app.post("/registration.html", function (request, response) {
   // process a simple register form
   console.log(sticker_qty);
   username = request.body.username;//retrieves the username data
   errors = {}; //Checks to see if username already exists
   //Username Validation
   if (typeof users_reg_data[username] != 'undefined') {
      errors.username_error = "Username is Already in Use"; //if username is in json file, say username is already in use
   }
   if ((/[a-z0-9]+/).test(request.body.username) == false) { //only allows numbers and letters for the username
      errors.username_error = "Only numbers/letters";
   }
   if ((username.length > 10) == true) {
      errors.username_error = "Please make your username shorter"; //if length is more than 10, show error to make the username shorter
   }
   if ((username.length < 4) == true) {
      errors.username_error = "Please make your username longer"; //if length is less than 4, show error to make the username longer
   }
   //Fullname Validation 
   fullname = request.body.fullname;
   if ((/[a-zA-Z]+[ ]+[a-zA-Z]+/).test(request.body.fullname) == false) {
      errors.fullname_error = "Only use letters and a space";
   }
   if ((fullname.length > 30) == true) {
      errors.fullname_error = "Please make your full name shorter. 30 characters max"; //if length is greater than 30, send error that 30 characters are max
   }
   //Email Validation
   if ((/[a-z0-9._]+@[a-z0-9]+\.[a-z]+/).test(request.body.email) == false) {
      errors.email_error = "Please enter proper email";
   }

   console.log(errors, users_reg_data);
   //If there are 0 errors, request all registration info
   if (Object.keys(errors).length == 0) {
      users_reg_data[username] = {};
      users_reg_data[username].username = request.body.username
      users_reg_data[username].password = request.body.password;
      users_reg_data[username].email = request.body.email;
      users_reg_data[username].fullname = request.body.fullname;

      fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //Writes registration info into the userdata json file
      theQuantQuerystring = qs.stringify(sticker_qty); //Turns quantity object into a string
      response.redirect("/invoice.html?" + theQuantQuerystring + `&username=${username}`); //If all things valid, redirect to the invoice page
   } else {
      qstring = qs.stringify(request.body) + "&" + qs.stringify(errors);
      response.redirect('/registration.html?' + qstring); //if there are errors, send back to registration page to retype
   }
});

// From Dan Port's Jawbreaker Example
app.get("/checkout", function (request, response) {
   // Generate HTML invoice string
   var user_email = request.query.email; // email address in querystring
   var invoice_str = `Thank you for your order!<table border><th>Quantity</th><th>Item</th><th>Price</th>`;
   var shopping_cart = request.session.cart;
   for (product_key in products_data) {
      for (i = 0; i < products_data[product_key].length; i++) {
         if (typeof shopping_cart[product_key] == 'undefined') continue;
         qty = shopping_cart[product_key][i];
         if (qty > 0) {
            invoice_str += `<tr><td>${qty}</td><td>${products_data[product_key][i].name}</td><td>${products_data[product_key][i].price}</td><tr>`;
         }
      }
   }
   invoice_str += '</table>';
   // Set up mail server. Only will work on UH Network due to security restrictions
   var transporter = nodemailer.createTransport({
      host: "mail.hawaii.edu",
      port: 25,
      secure: false, // use TLS
      tls: {
         // do not fail on invalid certs
         rejectUnauthorized: false
      }
   });

   //var user_email = 'phoney@mt2015.com';
   var mailOptions = {
      from: 'phoney_store@bogus.com',
      to: user_email,
      subject: 'Your phoney invoice',
      html: invoice_str
   };

   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         invoice_str += '<br>There was an error and your invoice could not be emailed :(';
      } else {
         invoice_str += `<br>Your invoice was mailed to ${user_email}`;
      }
      response.send(invoice_str);
   });

});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));