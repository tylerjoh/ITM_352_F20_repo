
function testExample(a) {
    var greeting = "Hi! My name is " + a + " :)";
    return greeting;
}

var name = "Tyler";
console.log(testExample(name));

___________________________________________________________________________

var testExample = function() {
    var greeting = "Hi! My name is " + a + " :)";
    return greeting;
}
var a = "Tyler";
console.log(testExample(a)); 

___________________________________________________________________________

(function() {
    var greeting = "Hi! My name is Tyler :)";
    console.log(greeting);
}())

