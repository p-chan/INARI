/*
  Module Exports
*/
var build = module.exports;


/*
  Node Module
*/

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var config = require('shelljs').config;
var fm = require('front-matter');
var marked = require('marked');
var jade = require('jade');
var reindent = require('js-beautify').html;
var colors = require('colors');


/*
  Settings
*/

var GLOBAL_INARI = path.resolve(__dirname, '../');
var CWD = process.cwd();
var POSTS_DIR = CWD + '/_posts/';
var VIEWS_DIR = CWD + '/_views/';
var BUILD_DIR = CWD + '/build/';

config.silent = true;   // shelljs silent mode

var space = ' ';

var settings;

var blog;


/*
  Run
*/

build.run = function () {
  console.log('INARI building...'.grey);
  console.time('build');
  importSettings();
}

function importSettings () {
  settings = JSON.parse(fs.readFileSync(CWD + '/config.json', 'utf8'));
  blog = {
    title : settings.title,
    description : settings.description,
    author : settings.author,
    twitter : settings.twitter,
    url : settings.url
  }
  var intention = 'compilePost';
  getFile(intention);
}

function getFile (intention) {
  fs.readdir(POSTS_DIR, function (err, files) {
    removeDrafts(files, intention);
  });
}

function removeDrafts (files, intention) {
  files = files.filter(function (file) {
    var firstStr = file.charAt(0);
    return (firstStr != '_' && firstStr != '.');
  });
  if (intention == 'compilePost') {
    compile(files);
  } else {
    getPostData(files);
  };
}

var count = 0;
var max = null;

function compile (files) {
  max = files.length;
  files.forEach(function (file) {
    readFile(file);
  });
}

function readFile (file) {
  fs.readFile(POSTS_DIR + file, 'utf8', function (err, data) {
    parseFile(data, file);
  });
}

function parseFile (data, file) {
  data = fm(data);
  post = {
    title : data.attributes.title,
    date : data.attributes.date,
    url : path.basename(file, '.md'),
    content : marked(data.body)
  };
  if (post.title == undefined) return console.log(colors.red('[ERR] ' + space + 'Not setting post title on ' + file));
  if (post.date == undefined) return console.log(colors.red('[ERR] ' + space + 'Not setting posted date on ' + file));
  post.date = dateFormat(post.date);
  renderFile(post, file);
}

function renderFile (post, file) {
  jade.renderFile(VIEWS_DIR + 'post.jade', {
    pretty : true,
    blog : blog,
    post : post
  }, function (err, html) {
    data = reindent(html, {
      indent_size: 2,
      space_before_conditional: false,
      preserve_newlines: false
    });
    writeFile(data, file);
  });
}

function writeFile (data, file) {
  fs.mkdir(path.join(BUILD_DIR, path.basename(file, '.md')), function (err) {
    fs.writeFile(path.join(BUILD_DIR, path.basename(file, '.md'), 'index.html'), data, function (err) {
      count++;
      if(count >= max) {
        console.log('[INFO]' + space + 'Compiled ' + max + 'posts');
        createIndex();
      };
    });
  });
}

function createIndex () {
  var intention = 'compileIndex';
  getFile(intention);
}

function getPostData (files) {
  var posts = [];
  var max = files.length;
  var count = 0;
  files.forEach(function (file) {
    fs.readFile(POSTS_DIR + file, 'utf8', function (err, data) {
      data = fm(data);
      var post = {
        blog : blog,
        title : data.attributes.title,
        date : dateFormat(data.attributes.date),
        url : path.basename(file, '.md')
      }
      posts.push(post);
      count++;
      if (count >= max) {
        sortPosts(posts);
      };
    });
  });
}

function sortPosts (posts) {
  posts = posts.sort(function (a, b) {
    return (a.date.yyyymmddhhmmss > b.date.yyyymmddhhmmss) ? -1 : 1;
  });
  renderIndex(posts);
}

function renderIndex (posts) {
  jade.renderFile(VIEWS_DIR + 'index.jade', {
    pretty : true,
    blog : blog,
    posts : posts
  }, function (err, html) {
    data = reindent(html, {
      indent_size: 2,
      space_before_conditional: false,
      preserve_newlines: false
    });
    writeIndex(data);
  });
}

function writeIndex (data) {
  fs.writeFile(CWD + '/build/index.html', data, function (err) {
    console.log('[INFO]' + space + 'Compiled index.html');
    destAssets();
  });
}

function destAssets () {
  shell.cp('-rf', path.join(VIEWS_DIR, 'assets'), BUILD_DIR);
  console.log('[INFO]' + space + 'Dested assets dir')
  git();
}

function git () {
  shell.exec('git add -A');
  shell.exec('git commit -m"commit"');
  console.timeEnd('build');
}

dateFormat = function (date) {
  msec = Date.parse(date);
  diff = date.getTimezoneOffset(date) * 60 * 1000;
  jsp = new Date(msec+diff);
  console.log(jsp);
  year = jsp.getFullYear() + '';
  month = jsp.getMonth() + 1;
  day = jsp.getDate() + '';
  var date = {};
  date.yyyymmdd = year + '-' + zeroCheck(month) + '-' + zeroCheck(day);
  date.yyyymmddhhmmss = jsp;
  function zeroCheck (num) {
    if (num < 10) return '0' + num;
    return num;
  }
  switch (month) {
    case 1:
      month = 'Jan';
      break;
    case 2:
      month = 'Feb';
      break;
    case 3:
      month = 'Mar';
      break;
    case 4:
      month = 'Apr';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'Jun';
      break;
    case 7:
      month = 'Jul';
      break;
    case 8:
      month = 'Aug';
      break;
    case 9:
      month = 'Sep';
      break;
    case 10:
      month = 'Oct';
      break;
    case 11:
      month = 'Nov';
      break;
    case 12:
      month = 'Dec';
      break;
  }
  date.dddmmmyyyy = day + ' ' + month + ' ' + year;
  return date;
}