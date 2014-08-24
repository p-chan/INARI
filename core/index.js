var http = require('http');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var jade = require('jade');

exports.func = function indexReq (req, res) {
  var dbPath = __dirname + '/content/data/inari.db';
  var db = new sqlite3.Database("dbPath");
  db.all("SELECT id FROM post", function (err, rows) {
    if (!err) {
      var indexTemplate = fs.readFileSync('./views/index.jade', 'utf-8');
      var indexTemplateRender = jade.render(indexTemplate, {
        title: 'Chiraura.me',
        description: 'This blog is chiraura.',
        author: 'p1ch_jp',
        pretty: true
      });
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(indexTemplateRender);
    };
  });
  db.close();
}