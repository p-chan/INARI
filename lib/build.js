var build = module.exports;

var fs = require('fs');
var path = require('path');
var async = require('async');
var shell = require('shelljs');

var GLOBAL_INARI = path.resolve(__dirname, '../');
var CWD = process.cwd();


/*
  Run
*/

build.run = function () {
  getAllFile();
  console.log('INARI build');
}

function getAllFile () {
  async.waterfall([
    function(callback){
      fs.readdir (CWD+'/_posts/', function (err, files) {
        callback(null, files);
      });
    },
    function(files, callback){
      console.log(files);
      callback(null, 'three');
    }
    ], function (err, result) {
      if(err) {
        throw err;
      }
      console.log('waterfall all done. ',result);
    });
}