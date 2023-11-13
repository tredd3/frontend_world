// exports.myDateTime = function () {
//     return Date();
// };

//var buf = Buffer.from('abc');
//var stream = require('stream');
//var zlib = require('zlib');

var http = require("http");
var url = require("url");
console.log(
  url.resolve("", "https://www.w3schools.com/nodejs/ref_url.asp", 10)
);
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     var q = url.parse(req.url, true);
//     res.write(q.href);
//     res.end();
// }).listen(8080);
