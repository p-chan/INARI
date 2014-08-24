var http = require('http');
var fs = require('fs');
var flow = require('nimble');
var jade = require('jade');
var sqlite3 = require('sqlite3').verbose();

exports.func = function indexReq (req, res) {
  var dbPath = 'content/data/inari.db';
  var db = new sqlite3.Database(dbPath);
  db.serialize(function () {
    db.get('SELECT title FROM post;', function (err, post) {
      console.log(post);
    });
  });
  db.close();
  var indexTemplate = fs.readFileSync('./views/index.jade', 'utf-8');
  var indexTemplateRender = jade.render(indexTemplate, {
    title: 'Chiraura.me',
    description: 'This is chiraura blog.',
    author: '@p1ch_jp',
    pretty: true
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(indexTemplateRender);
}