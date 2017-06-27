'use strict'
//let exports = module.exports = {};
// exports.getMockSanityTestFailureData = function () {
//     var numberOfSanityTestFailures = [];
//     var instanceOfSanityTestFailures = {};
//     instanceOfSanityTestFailures["persistence sor service"] = 2;
//     numberOfSanityTestFailures.push(instanceOfSanityTestFailures);
//     instanceOfSanityTestFailures = {};
//     instanceOfSanityTestFailures["alm"] = 1;
//     numberOfSanityTestFailures.push(instanceOfSanityTestFailures);
//     instanceOfSanityTestFailures = {};
//     instanceOfSanityTestFailures["persistence orchestration service"] = 4;
//     numberOfSanityTestFailures.push(instanceOfSanityTestFailures);
//     return numberOfSanityTestFailures;
// }

exports.getMockSanityTestFailureData = function () {
    var numberOfSanityTestFailures = [];
    var instanceOfSanityTestFailures = {};
    instanceOfSanityTestFailures["persistence internal sor service"] = 15;
    numberOfSanityTestFailures.push(instanceOfSanityTestFailures);
    instanceOfSanityTestFailures = {};
    instanceOfSanityTestFailures["persistence orchestration service"] = 1;
    numberOfSanityTestFailures.push(instanceOfSanityTestFailures);
    instanceOfSanityTestFailures = {};
    instanceOfSanityTestFailures["logi flow gateway"] = 1;
    numberOfSanityTestFailures.push(instanceOfSanityTestFailures);
    instanceOfSanityTestFailures = {};
    instanceOfSanityTestFailures["ui web service"] = 1;
    numberOfSanityTestFailures.push(instanceOfSanityTestFailures);
    instanceOfSanityTestFailures = {};
    instanceOfSanityTestFailures["metadata dna service"] = 1;
    numberOfSanityTestFailures.push(instanceOfSanityTestFailures);
    return numberOfSanityTestFailures;
}