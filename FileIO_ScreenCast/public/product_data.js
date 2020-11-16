products = [
    {
        "model": "Apple iPhone XS",
        "price": 990.00
    },
    {
        "model": "Samsung Galaxy",
        "price": 240.00
    }
];

if (typeof module != 'undefined') {
    module.exports.products = products;
} //exporting "products", which can be avaliable to other programs that require product_data.js (TestRequire.js)
