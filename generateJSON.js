const Placeholders = require('./placeholdersF.js');
var Client = require('node-rest-client').Client;
var fs = require('fs');
var client = new Client();
//var jsonEmitted = fs.createWriteStream('EventsEmitted.json');
//let exports = module.exports = {};

exports.generateParsedJSONFile = function() {
    // client.get(Placeholders.APIEndPoint(), function (data, response) {
    //     jsonEmitted.write(JSON.stringify(data));
    // });
}