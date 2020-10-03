var number = 0; //Counter for age
var myAge = 20; //My Age 

console.log("Silly counting program for Ex2, with break");
while (number < myAge) {
    console.log("Age=" +number);
    if (number > myAge / 2) {
        console.log("Iʻm old!");
        break;
    }
    number++;
}
console.log('Iʻm outta here!');