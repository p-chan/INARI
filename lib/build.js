var build = module.exports;

var fs = require('fs');
var path = require('path');
var async = require('async');
var shell = require('shelljs');
var fm = require('front-matter');
var marked = require('marked');
var jade = require('jade');
var reindent = require('js-beautify').html;

var GLOBAL_INARI = path.resolve(__dirname, '../');
var CWD = process.cwd();
var POSTS_DIR = CWD + '/_posts/';
var VIEWS_DIR = CWD + '/_views/';

var list = ['hello.md', '2nd_post.md'];

/*
  Run
*/

build.run = function () {
  var fileList = [];
  fs.readdir(POSTS_DIR, function(err, files) {
    files.filter(function(file) {
      return file.charAt(0) != '_';
    }).forEach(function(file) {
      fileList.push(file);
    });
    console.log(fileList);
  });
  // 記事コンパイル
  list.forEach(function(item) {
    postData = compilePost(POSTS_DIR+item);
  });
}

// Generate post
compilePost = function (post_path) {
  async.waterfall([
    // Compile
    function(callback) {
      fs.readFile(post_path, 'utf8', function (err, post) {
        // Parse fm
        getPostData = fm(post);
        post_head_fm = getPostData.attributes;
        post_body_md = getPostData.body;
        // Compile Markdown
        post_body_html = marked(post_body_md);
        // Compile Jade
        jade.renderFile(VIEWS_DIR + 'post.jade', {
          pretty: true,
          title: post_head_fm.title,
          content: post_body_html
        }, function (err, html) {
          html = reindent(html, { indent_size: 2, space_before_conditional: false, preserve_newlines: false,});
          callback(null, html, post_path);
        });
      });
    },
    // Write file
    function(html, post_path, callback) {
      fs.writeFile(path.join(CWD + '/build/blog/' + path.basename(post_path, '.md') + '.html'), html, function (err) {
        callback(null, html);
      });
    }
  ], function (err, html) {
    console.log('Compiled')
  });
}