'use strict'
const checkEnv = require('./checkEnv.js');
const placeholders = require('./placeholdersF.js');
const generateJSON = require('./generateJSON.js');
const buildJSON = require('./buildJSON');
//let exports = module.exports = {};
exports.parseJSON = function () {
    const fs = require('fs');
    const finalJSONResult = fs.createWriteStream('finalJSON.JSON');
    let uniqueEntryArrays = [];
    let uniqueErrorArrays = [];
    let standaloneArrays = [];
    checkEnv.checkEnvironmentVariableSettings();
    generateJSON.generateParsedJSONFile();
    let parsedJSON = require('./EventsEmitted.json'); //This should be modified to be output of generateJSON.generateParsedJSONFile()
    fs.readFile('serviceList.txt', function (err, data) {
        if (err) throw err;
        var array = data.toString().split(",");
        array.map(serviceName => {
            parsedJSON.events.map(evt => {
                serviceName = serviceName.trim().replace(/\"/g, "");
                serviceName = serviceName.replace(/-/g, ' ');
                serviceName = serviceName.replace(/_/g, ' ');
                var denormalizedEventTags = evt.tags.map(function (x) {
                    x = x.replace(/_/g, ' ');
                    return x.replace(/-/g, ' ');
                });
                if (serviceName.trim() && evt.alert_type.toLowerCase() == "success"
                    && denormalizedEventTags.findFirstSubstring(serviceName) > -1) {
                    uniqueEntryArrays.push(serviceName);
                    if (standaloneArrays.indexOf(serviceName) > -1) {
                        var index = standaloneArrays.indexOf(serviceName);
                        standaloneArrays.splice(index, 1);
                    }
                }
                else if (serviceName.trim() && evt.alert_type.toLowerCase() == "failure"
                    && denormalizedEventTags.findFirstSubstring(serviceName) > -1) {
                    uniqueErrorArrays.push(serviceName);
                    if (standaloneArrays.indexOf(serviceName) > -1) {
                        var index = standaloneArrays.indexOf(serviceName);
                        standaloneArrays.splice(index, 1);
                    }
                }
                else {
                    if (standaloneArrays.indexOf(serviceName) == -1 && uniqueEntryArrays.indexOf(serviceName) == -1
                        && uniqueErrorArrays.indexOf(serviceName) == -1) {
                        standaloneArrays.push(serviceName);
                    }
                }
            })
        });
        var counts = {};
        var errorCount = {};
        var standaloneCount = {};
        uniqueEntryArrays.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        uniqueErrorArrays.forEach(function (x) { errorCount[x] = (errorCount[x] || 0) + 1; });
        standaloneArrays.forEach(function (x) { standaloneCount[x] = 0 });
        var opts = {};
        opts.SuccessText = "NumberOfDeployments";
        opts.FailureText = "NumberOfRollbacks";
        finalJSONResult.write(buildJSON.createJSON(counts, errorCount, standaloneCount, opts));
        console.log('Done');
    });

    Array.prototype.findFirstSubstring = function (s) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].indexOf(s) !== -1)
                return i;
        }
        return -1;
    };
}