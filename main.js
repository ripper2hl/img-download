var request = require('request');
var fs = require('fs');
var sanitize = require('sanitize-filename');
var url = require("url");
var path = require("path");

process.argv = process.argv.slice(2);

if(process.argv.length > 0){
  var separator = process.argv[1];
  var directory = process.argv[3];
  var imgUrlString = process.argv[5];
  download(separator,directory,imgUrlString);
}

function download(separator,directory,imgUrlString){
  var date = new Date();
  var dateFormat = '_' + date.getFullYear() + '_' +
  date.getMonth() + '_' + date.getDate() +
  '_' + date.getHours() +  '_' + date.getMinutes() + '_' + date.getSeconds();
  directory = sanitize(directory + dateFormat);

  var images = imgUrlString.split(separator);
  fs.mkdir(directory);
  images.forEach(function(img) {
    var parsed = url.parse(img);
    var fileName = sanitize(path.basename(parsed.pathname));
    fileName = fileName.replace(/%20/g,'_');
    console.log('Saving ' + fileName);
    request(img)
    .pipe(fs.createWriteStream(directory + '/' + fileName));
  });

}
