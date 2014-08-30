var init = module.exports;

var path = require('path');
var shell = require('shelljs');

var GLOBAL_INARI = path.resolve(__dirname, '../');

init.run = function (arg) {
  console.log(process.cwd());
  console.log("init " + arg);
}