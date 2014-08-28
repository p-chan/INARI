var http = require('http');
var fs = require('fs');
var index = require('./core/index.js');
var post = require('./core/post.js');
var flow = require('nimble');
var jade = require('jade');

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
      res.end();
      break;
    case '/inari/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("Welcome to inari");
      res.end();
      break;
    default:
      post.func(req, res);
      break;
  }
}