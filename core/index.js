var http = require('http');
var fs = require('fs');
var jade = require('jade');

exports.func = function hoge (req, res) {
  var indexTemplate = fs.readFileSync('./views/index.jade', 'utf-8');
  var indexTemplateRender = jade.render(indexTemplate, {
    title: 'Chiraura.me',
    description: 'This blog is chiraura.',
    author: 'p1ch_jp',
    pretty: true
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(indexTemplateRender);
}