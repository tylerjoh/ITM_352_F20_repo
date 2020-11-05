

products = [
    {
        "model": "Metal Vent",
        "price": 78.00,
        "image": "metal-vent.png"
    },
    {
        "model": "T.H.E Short",
        "price": 68.00,
        "image": "THEshort.png"
    },
    {
        "model": "License to Train Jogger",
        "price": 128.00,
        "image": "jogger.png"
    },
    {
        "model": "Metal Vent Tech Short Sleeve 2.0",
        "price": 78.00,
        "image": "metal2.png"
    },
    {
        "model": "More Miles Duffel 40L",
        "price": 198.00,
        "image": "bag.png"
    }
];

console.log(products);

function isNonNegInt(userString, returnErrors = false) {
    errors = [];                                                        // Assume no errors at first
    if (Number(userString) != userString) errors.push('Not a number!'); // Check if string is a number 
    if (userString < 0) errors.push('Negative value!');                 // Check if non-negative
    if (parseInt(userString) != userString) errors.push('Not an integer!'); // Check it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

function displayPurchase(user_input) {
    if (isNonNegInt(user_input) == true) {
        console.log("Hooray!!" + user_input);
    }
}

let metal_vent_quantity_textbox = document.querySelector('#metal_vent_quantity_textbox');
metal_vent_quantity_textbox.addEventListener('input', function(){
    let user_input = metal_vent_quantity_textbox.value
    //console.log(user_input);
    errs = isNonNegInt(user_input, true);
    //console.log(errs);
    displayPurchase(user_input);
})
console.log(metal_vent_quantity_textbox);

let THE_short_quantity_textbox = document.querySelector('#THE_short_quantity_textbox');
THE_short_quantity_textbox.addEventListener('input', function(){
    let user_input = THE_short_quantity_textbox.value
    //console.log(user_input);
    errs = isNonNegInt(user_input, true);
    //console.log(errs);
})


let jogger_quantity_textbox = document.querySelector('#jogger_quantity_textbox');
jogger_quantity_textbox.addEventListener('input', function(){
    let user_input = jogger_quantity_textbox.value
    //console.log(user_input);
    errs = isNonNegInt(user_input, true);
    //console.log(errs);
})


let metal_2_qquantity_textbox = document.querySelector('#metal_2_qquantity_textbox');
metal_2_qquantity_textbox.addEventListener('input', function(){
    let user_input = metal_2_qquantity_textbox.value
    //console.log(user_input);
    errs = isNonNegInt(user_input, true);
    //console.log(errs);
})

let bag_quantity_textbox = document.querySelector('#bag_quantity_textbox');
bag_quantity_textbox.addEventListener('input', function(){
    let user_input = bag_quantity_textbox.value
    //console.log(user_input);
    errs = isNonNegInt(user_input, true);
    //console.log(errs);
})





