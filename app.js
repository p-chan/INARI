var http = require('http');
var fs = require('fs');
var index = require('./core/index.js');
var flow = require('nimble');
var jade = require('jade');
var sqlite3 = require('sqlite3').verbose();

var server = http.createServer();
server.on('request', doRequest);
server.listen(5000, function () {
  console.log('Server running! on localhost:5000...');
});

function doRequest (req, res) {
  var dbPath = __dirname + '/content/data/inari.db';
  var db = new sqlite3.Database(dbPath);
  switch (req.url) {
    case '/':
      db.serialize(function () {
        db.get('SELECT title FROM post;', function (err, results) {
          console.log(results.title);
        });
      });
      var indexTemplate = fs.readFileSync('./views/index.jade', 'utf-8');
      var indexTemplateRender = jade.render(indexTemplate, {
        title: 'Chiraura.me',
        description: 'This is chiraura blog.',
        author: '@p1ch_jp',
        pretty: true
      });
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(indexTemplateRender);
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
  db.close();
}