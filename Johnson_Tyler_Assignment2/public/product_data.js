// Product Data
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

if (typeof module != 'undefined') { //if the type of the module is defined
    module.exports.products = products; //export the product_data
}