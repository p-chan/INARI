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
  async.waterfall([
    // Get Databace
    function(callback) {
      var db = require(CWD + '/db.json');
      console.log('require db');
      callback(null, db);
    },
    // Get Files
    function(db, callback) {
      fs.readdir(POSTS_DIR, function(err, files) {
        callback(null, files);
      });
    },
    // Remove Draft
    function(files, callback) {
      console.log(files);
      callback(null, 1, 2, 3);
    }
  ],
  function(err, arg1, arg2, arg3) {
    console.log('all done.');
    console.log(arg1, arg2, arg3);
  });
  // 記事取得
  // getCompileList();
  // console.log(list);
  // 記事コンパイル
  list.forEach(function(item) {
    postData = compilePost(POSTS_DIR+item);
  });
}

// Get Files
function getFiles () {
  fs.readdir(POSTS_DIR, function (err, files) {
    console.log('function : ' + files);
  });
}

// Get Files
// getCompileList = function(){
//   fs.readdir(POSTS_DIR, function(err, files) {
//     files.filter(function(file) {
//       return file.charAt(0) != '_'; // Hide Draft
//     }).forEach(function(file, index) {
//       fs.stat(POSTS_DIR + file, function(err, stats) {
//         mtime = dateFormat(stats.mtime);
//         console.log(index + ':' + (files.length - 1));
//         if (index == files.length - 1) {console.log("final")};
//         if (db[file] = mtime) {
//           console.log("push");
//           list.push(file);
//         }
//       });
//     });
//   });
// }

// DateFormat
dateFormat = function (date) {
  year = date.getFullYear() + '';
  month = date.getMonth() + 1 + '';
  day = date.getDate() + '';
  hour = date.getHours() + '';
  min = date.getMinutes() + '';
  sec = date.getSeconds() + '';
  if(month < 10) { month = "0" + month; }
  if(day < 10) { day = "0" + day; }
  if(hour < 10) { hour = "0" + hour; }
  if(min < 10) { min = "0" + min; }
  if(sec < 10) { sec = "0" + sec; }
  date = year + month + day + hour + min + sec;
  return date;
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
    console.log('Compiled');
  });
}