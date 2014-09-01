var inari = module.exports;

var fs = require('fs');

var init = require('./init.js');
var build = require('./build.js');

inari.init = function (dirName) {
  init.run(dirName);
}

inari.build = function() {
  build.run();
};

inari.deploy = function () {
  console.log('INARI deploy');
}