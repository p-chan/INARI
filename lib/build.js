var build = module.exports;

var fs = require('fs');
var path = require('path');
var async = require('async');
var shell = require('shelljs');
var fm = require('front-matter');
var marked = require('marked');
var jade = require('jade');

var GLOBAL_INARI = path.resolve(__dirname, '../');
var CWD = process.cwd();
var POSTS_DIR = CWD + '/_posts/';
var VIEWS_DIR = CWD + '/_views/';


/*
  Run
*/

build.run = function () {
  async.waterfall([
    function(callback) {
      hoge = compilePost(POSTS_DIR+'2nd_post.md');
      callback(null, hoge);
    },
    function(hiki, callback) {
      console.log(hiki);
      callback(null, 'done');
    }
  ], function (err, result) {
    console.log(result);
  });
}

// 記事コンパイル
compilePost = function (post_path) {
  async.waterfall([
    function(callback) {
      fs.readFile(post_path, 'utf8', function (err, post) {
        // Parse fm
        getPostData = fm(post);
        post_head_fm = getPostData.attributes;
        post_body_md = getPostData.body;
        // Compile Markdown
        post_body_html = marked(post_body_md);
        // Jade Compile
        compiled_html = jade.renderFile(VIEWS_DIR + 'post.jade', {
          pretty: true,
          title: post_head_fm.title,
          content: post_body_html
        }, function (err, html) {
          console.log('HTML : ' + html);
        });
        callback(null, compiled_html);
      });
    }], function (err, result) {
      console.log("hoge");
      return result;
    });
}

//     fs.readFile(post_path, 'utf8', function (err, post) {
//       // Parse fm
//       getPostData = fm(post);
//       post_head_fm = getPostData.attributes;
//       post_body_md = getPostData.body;
//       // Compile Markdown
//       post_body_html = marked(post_body_md);
//       // JADE COMPILE
//       compiled_html = jade.renderFile(VIEWS_DIR + 'post.jade', {
//         pretty: true,
//         title: post_head_fm.title,
//         content: post_body_html
//       });
//       return (compiled_html);
//     });
// }

// function buildPosts () {
//   async.waterfall([
//     // 記事読み込み
//     function(callback){
//       fs.readdir (CWD + '/_posts/', function (err, files) {
//         files = files.filter(function (elem) {
//           return (elem.charAt(0) != '_');
//         });
//         callback(null, files);
//       });
//     },
//     // front-matterでメタ情報と本文に分割
//     function(files, callback){
//       var post_fm;
//       var post_md;
//       var post_data;
//       files.forEach (function (file, index) {
//         fs.readFile(CWD + '/_posts/' + file, 'utf8', function (err, data) {
//           var post = fm(data);
//           post_fm = post.attributes;
//           post_md = post.body;
//           post_data.push(post_fm);
//           if( index == files.length - 1 ){
//             console.log('ループが終わりました。');
//             callback(null, files, post_data);
//           }
//         });
//       });
//     },
//     function(files, post_data, callback){
//       console.log(post_data);
//       callback(null, files);
//     }
//     ], function (err, result) {
//       if(err) {
//         throw err;
//       }
//       console.log('waterfall all done. ',result);
//     });
// }







// compilePost = function (post_path) {
//   fs.readFile(post_path, 'utf8', function (err, post) {
//     // Parse fm
//     getPostData = fm(post);
//     post_head_fm = getPostData.attributes;
//     post_body_md = getPostData.body;
//     // Compile Markdown
//     post_body_html = marked(post_body_md);
//     // JADE COMPILE
//     compiled_html = jade.renderFile(VIEWS_DIR + 'post.jade', {
//       pretty: true,
//       title: post_head_fm.title,
//       content: post_body_html
//     });
//     return (compiled_html);
//   });
// }