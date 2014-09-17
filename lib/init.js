var init = module.exports;

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

var GLOBAL_INARI = path.resolve(__dirname, '../');
var CWD = process.cwd();


/*
  Run
*/

init.run = function (dirName) {
  inari_init(dirName);
  git_init(dirName);
  console.log('INARI INIT');
}


/*
  INARI init
*/

function inari_init (dirName) {
  shell.mkdir('-p', dirName);
  shell.cp('-r', path.join(GLOBAL_INARI, '/template/*'), dirName);
}


/*
  Git init
*/

function git_init (dirName) {
  git_installed = check_git_install();
  if (!git_installed.status) return git_installed.error;
  shell.exec('git init ' + path.join(CWD, dirName), { silent: true });
}

function check_git_install(){
  if (shell.which('git')) {
    return { status: true };
  } else {
    return { status: false, error: 'please install git' };
  }
}