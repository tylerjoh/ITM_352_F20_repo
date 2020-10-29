attributes = "Tyler;21;MIS"
separator = ';';
var parts = attributes.split(separator);
for (i=0; i < parts.length; i++) {
    console.log(typeof parts[i]);
}

console.log(parts.join(separator))

