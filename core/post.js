var http = require('http');
var fs = require('fs');
var flow = require('nimble');
var jade = require('jade');
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

exports.func = function postReq (req, res) {
  var reqUrl = req.url.replace (/\u002f/g, "");
  console.log(reqUrl);
  var dbPath = 'content/data/inari.db';
  var db = new sqlite3.Database(dbPath);
  db.serialize(function () {
    db.get("SELECT * FROM post WHERE slug = '" + reqUrl + "'", function (err, post) {
      if (!err) {
        console.log("hoge");
        console.log(post);
        var indexTemplate = fs.readFileSync('./views/index.jade', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("hello");
      } else {
        console.log("err");
        res.end("err");
      };
    });
  });
  db.close();
}