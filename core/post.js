var http = require('http');
var fs = require('fs');
var jade = require('jade');
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

exports.func = function postReq (req, res) {
  var reqUrl = req.url.replace (/\u002f/g, "");
  var dbPath = 'content/data/inari.db';
  var db = new sqlite3.Database(dbPath);
  db.serialize(function () {
    db.get("SELECT * FROM post WHERE slug = '" + reqUrl + "'", function (err, postData) {
      if (!err) {
        var indexTemplate = fs.readFileSync('./content/views/post.jade', 'utf-8');
        var indexTemplateRender = jade.render(indexTemplate, {
          title: 'Chiraura.me',
          description: 'This is chiraura blog.',
          author: '@p1ch_jp',
          post: postData,
          pretty: true
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexTemplateRender);
        res.end();
      } else {
        console.log("err");
        res.end("err");
      };
    });
  });
  db.close();
}