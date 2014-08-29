var http = require('http');
var fs = require('fs');
var jade = require('jade');
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

var index = require('core/index.js');
var post = require('core/post.js');

exports.func = function doReq (req, res) {
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