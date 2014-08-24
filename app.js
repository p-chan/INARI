var http = require('http');
var fs = require('fs');
var index = require('./core/index.js');
var flow = require('nimble');
var jade = require('jade');
// var sqlite3 = require('sqlite3').verbose();

var server = http.createServer();
server.on('request', doRequest);
server.listen(5000, function () {
  console.log('Server running! on localhost:5000...');
});

function doRequest (req, res) {
  switch (req.url) {
    case '/':
      index.func(req, res);
      break;
    case '/login/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('please input addres and password.');
      break;
    case '/inari/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("Welcome to inari");
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('404 Not Found!!');
      break;
  }
  res.end();
}