var http = require('http');
var url = require('url');

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    var txt = "up and running"
    res.end(txt);
})

const port = 8080;

server.listen(8080, () => console.log('server running ............'));

//http://localhost:8080/?year=2017&month=July