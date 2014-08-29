var http = require('http');
var fs = require('fs');
var jade = require('jade');
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

exports.func = function indexReq (req, res) {
  var dbPath = 'content/data/inari.db';
  var db = new sqlite3.Database(dbPath);
  db.serialize(function () {
    db.all('SELECT title, created_at, slug FROM post ORDER BY created_at DESC;', function (err, postsData) {
      if (!err) {
        var indexTemplate = fs.readFileSync('./content/views/index.jade', 'utf-8');
        var indexTemplateRender = jade.render(indexTemplate, {
          title: 'Chiraura.me',
          description: 'This is chiraura blog.',
          author: '@p1ch_jp',
          posts: postsData,
          pretty: true
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexTemplateRender);
        res.end();
      } else {
        console.log("err");
        res.end("ほげ");
      };
    });
  });
  db.close();
}