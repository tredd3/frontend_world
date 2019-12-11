var http = require('http');
var dt = require('./mymodules');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    var txt = "up and running"
    res.end(txt);
}).listen(8080);

//http://localhost:8080/?year=2017&month=July