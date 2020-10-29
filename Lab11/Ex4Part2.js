for (i=0; i < parts.length; i++){
    console.log(`${parts[i]} isNotNegInt ${isNotNegInt(parts[i])}`);
    }
    console.log(parts.join(Separator))
    function isNotNegInt(q) {
        errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return(errors.length == 0);
    }
    
    