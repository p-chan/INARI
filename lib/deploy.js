/*
  Module Exports
*/
var deploy = module.exports;


/*
  Node Module
*/

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var config = require('shelljs').config;
var fm = require('front-matter');
var colors = require('colors');
var readdirp = require('readdirp');


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

deploy.run = function () {
  console.log('INARI deployning...'.grey);
  console.time('deploy');
  getHTMLList();
}

function getHTMLList () {
  fs.readdir(BUILD_DIR, function (err, files) {
    HTMLFiles = files.filter(function (file) {
      var firstStr = file.charAt(0);
      return (firstStr != '.' && file != 'assets' && file != 'index.html');
    });
    getMDList(HTMLFiles);
  });
}

function getMDList (HTMLFiles) {
  fs.readdir(POSTS_DIR, function (err, files) {
    MDFiles =files.filter(function (file) {
      var firstStr = file.charAt(0);
      return (firstStr != '_' && firstStr != '.');
    });
    getDelPost(HTMLFiles, MDFiles);
  })
}

function getDelPost (HTMLFiles, MDFiles) {
  var files = HTMLFiles.concat(MDFiles);
  files = files.map(function (file) {
    file = path.basename(file, '.md');
    return file;
  });
  files = files.filter(function (x, i, self) {
    return self.indexOf(x) == self.lastIndexOf(x);
  });
  delPost(files);
}

function delPost (files) {
  var count = 0;
  var max = files.length;
  if (max == 0) deployBlog();
  files.forEach(function (file) {
    shell.rm('-rf', path.join(BUILD_DIR, file));
    console.log('[INFO]' + space + 'Deleted ' + file);
    count++;
    if (count >= max) {
      deployBlog();
    };
  });
}

function deployBlog () {
  importSettings();
}

function importSettings () {
  settings = JSON.parse(fs.readFileSync(CWD + '/config.json', 'utf8'));
  pushMaster();
}

function pushMaster () {
  shell.exec('git checkout master');
  shell.exec('git add -A');
  shell.exec('git commit -m "Automated commit by inari."');
  shell.exec('git remote add origin ' + settings.git);
  shell.exec('git push origin master');
  console.log('[INFO]' + space + 'Push to master branch.');
  pushGHP();
}

function pushGHP () {
  shell.exec('git branch -D gh-pages');
  shell.exec('git branch gh-pages');
  shell.exec('git checkout gh-pages');
  deleteOthers();
}

var max = NaN;
var count = 0;

function deleteOthers () {
  readdirp({ root: CWD, directoryFilter: ['!build','!.git'] }, function (err, res) {
    max = res.files.length + res.directories.length;
    count = 0;
    res.files.forEach(function (file) {
      shell.rm(file.path);
      count++;
      if (count >= max) dumpBuild2root();
    });
    res.directories.forEach(function (dir) {
      shell.rm('-rf', dir.path);
      count++;
      if (count >= max) dumpBuild2root();
    });
  });
}

function dumpBuild2root () {
  var target = path.join(BUILD_DIR, '*');
  shell.exec('mv -f ' + target + ' ' + CWD);
  shell.rm('-rf', BUILD_DIR);
  push2ghp();
}

function push2ghp () {
  shell.exec('git add -A');
  shell.exec('git commit -m "Automated commit by inari."');
  shell.exec('git checkout master');
  shell.exec('git push origin gh-pages --force');
  console.log('[INFO]' + space + 'Push to gh-pages branch.');
  shell.exec('git checkout master');
  console.timeEnd('deploy')
}