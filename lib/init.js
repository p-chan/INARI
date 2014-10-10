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
  git_init(dirName);
}


/*
  Git init
*/

function git_init (dirName) {
  git_installed = check_git_install();
  if (!git_installed.status) return git_installed.error;
  shell.exec('git init ' + path.join(CWD, dirName), { silent: true });
  inari_init(dirName);
}

function check_git_install(){
  if (shell.which('git')) {
    return { status: true };
  } else {
    return { status: false, error: 'please install git' };
  }
}


/*
  INARI init
*/

function inari_init (dirName) {
  shell.mkdir('-p', dirName);
  shell.cp('-r', path.join(GLOBAL_INARI, '/template/*'), dirName);
  console.log('                     '.white.inverse);
  console.log('    WELCOME INARI    '.white.inverse);
  console.log('     (｀・ω・´)      '.white.inverse);
  console.log('                     '.white.inverse);
  console.log('    ∵∴∵∴∵∴∵∴∵∴∵∴∵    '.white.inverse);
  console.log('     ==ⅲ=====ⅲ==     '.white.inverse);
  console.log('       ⅲ     ⅲ       '.white.inverse);
  console.log('       ⅲ     ⅲ       '.white.inverse);
  console.log('       ⅲ     ⅲ       '.white.inverse);
  console.log('      ===   ===      '.white.inverse);
  console.log('                     '.white.inverse);
}