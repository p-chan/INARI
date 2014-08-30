var inari = module.exports;
var init = require('./init.js');

inari.run = function() {
    console.log('Hello INARI!');
};

inari.init = function (arg) {
  init.run(arg);
}

inari.new = function () {
  console.log('INARI new');
}

inari.deploy = function () {
  console.log('INARI deploy');
}