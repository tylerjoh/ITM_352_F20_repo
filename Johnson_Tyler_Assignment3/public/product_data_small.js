// Product Data
products_small = [
    {
        "model": "Metal Vent",
        "size" : "(Small)",
        "price": 78.00,
        "image": "metal1.png"
    },
    {
        "model": "T.H.E Short",
        "size" : "(Small)",
        "price": 68.00,
        "image": "shorts1.png"
    },
    {
        "model": "License to Train Jogger",
        "size" : "(Small)",
        "price": 128.00,
        "image": "jogger.png"
    },
    {
        "model": "Metal Vent Tech Short Sleeve 2.0",
        "size" : "(Small)",
        "price": 78.00,
        "image": "metal2.png"
    },
    {
        "model": "More Miles Duffel 40L",
        "size" : "(Small)",
        "price": 198.00,
        "image": "bag1.png"
    }
];

if (typeof module != 'undefined') { //if the type of the module is defined
    module.exports.products_small = products_small; //export the product_data
}