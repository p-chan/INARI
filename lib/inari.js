var inari = module.exports;
var init = require('./init.js');

inari.build = function() {
    console.log('build INARI!');
};

inari.init = function (dirName) {
  init.run(dirName);
}

inari.deploy = function () {
  console.log('INARI deploy');
}