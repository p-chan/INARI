var http = require('http');
var fs = require('fs');
var flow = require('nimble');
var jade = require('jade');
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

exports.func = function indexReq (req, res) {
  var dbPath = 'content/data/inari.db';
  var db = new sqlite3.Database(dbPath);
  db.serialize(function () {
    db.all('SELECT title, created_at FROM post LIMIT 8;', function (err, post) {
      if (err) {
        console.log("err");
      } else {
        console.log(post);
        var indexTemplate = fs.readFileSync('./views/index.jade', 'utf-8');
        var indexTemplateRender = jade.render(indexTemplate, {
          title: 'Chiraura.me',
          description: 'This is chiraura blog.',
          author: '@p1ch_jp',
          post: post,
          pretty: true
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexTemplateRender);
        res.end();
      };
    });
  });
  db.close();
}