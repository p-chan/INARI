var http = require('http');
var fs = require('fs');
var index = require('./core/index.js');
var post = require('./core/post.js');
var jade = require('jade');

var server = http.createServer();
server.on('request', doReq);
server.listen(5000, function () {
  console.log('Server running! on localhost:5000...');
});

function doReq (req, res) {
  switch (req.url) {
    case '/':
      index.func(req, res);
      break;
    case '/inari/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("Welcome to inari");
      res.end();
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write("404 Not Found!!");
      res.end();
      break;
  }
}