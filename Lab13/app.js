var http = require('http');


var server = http.createServer(function(req, res){
    console.log('request was made: ' + req.url); //notifies url that was processed
    res.writeHead(200, {'Content-Type': 'text/plain'}); //Headers are the elements of the server that are not shown
    res.end('Hi Tyler');
});

// Setting a port number and IP address
server.listen(3000, '127.0.0.1')
console.log('Hellooooo, now listening to port 3000');