var inari = module.exports;

var init = require('./init.js');

inari.run = function() {
    console.log('Hello INARI!');
};

inari.init = function () {
  return init.run();
}

inari.new = function () {
  console.log('INARI new');
}

inari.deploy = function () {
  console.log('INARI deploy');
}