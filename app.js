var http = require('http');
var fs = require('fs');
var router = require('./core/router.js');
var jade = require('jade');

var server = http.createServer();
server.on('request', router.func);
server.listen(5000, function () {
  console.log('Server running! on localhost:5000...');
});