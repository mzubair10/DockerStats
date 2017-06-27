const mockSanityTestData = require('./mockSanityTestFailureData.js');
const scoreConstants = require('./constants.js');
const numberOfContainers = require('./numberOfContainers.js');
const expectedServiceListJSON = require('./appdevproduction.json');
const actualServiceListJSON = require('./deployedcontainers.json');
var exports = module.exports = {};
exports.createJSON = function (mockObj, mockFailureObj, standaloneObj, options) {
    var deploymentPerService = {};
    var numberOfSanityTestFailures = mockSanityTestData.getMockSanityTestFailureData();
    deploymentPerService.ServiceDeployments = [];
    deploymentPerService.ServiceDeployments.push({});
    deploymentPerService.ServiceDeployments[0]['env'] = process.env['Environment'];
    deploymentPerService.ServiceDeployments[0]['services'] = [];
    deploymentPerService.ServiceDeployments[0]['bottom5Services'] = [];
    //Successful deployment score
    Object.keys(mockObj).forEach(function (key) {
        var tmpObject = new Object();
        tmpObject["name"] = key;
        if (mockObj[key]) {
            tmpObject[options.SuccessText] = mockObj[key];
        }
        else {
            tmpObject[options.SuccessText] = 0;
        }
        //Service can belong to both successful and errored state. Below code will check for such services and remove it from errored state so that it doesn't compute twice
        if (mockFailureObj[key]) {
            tmpObject[options.FailureText] = mockFailureObj[key];
            if (tmpObject["score"]) {
                tmpObject["score"] = tmpObject["score"] - mockFailureObj[key];
            } else {
                tmpObject["score"] = 0 - mockFailureObj[key];
            }
            delete mockFailureObj[key];
        }
        else {
            tmpObject[options.FailureText] = 0;
        }
        if (tmpObject["score"]) {
            tmpObject["score"] = tmpObject["score"] + (scoreConstants.SUCCESSFUL_DEPLOY_SCORE * mockObj[key]);
        }
        else {
            tmpObject["score"] = (scoreConstants.SUCCESSFUL_DEPLOY_SCORE * mockObj[key]);
        }

        numberOfSanityTestFailures.map(x => {
            Object.keys(x).map(function (k) {
                if (k == key) {
                    if (tmpObject["score"]) {
                        tmpObject["score"] = tmpObject["score"] - (scoreConstants.SANITY_TEST_FAILURE_SCORE * x[k]);
                    }
                    else {
                        tmpObject["score"] = 0 - (scoreConstants.SANITY_TEST_FAILURE_SCORE * x[k]);
                    }
                    tmpObject["NumberOfSanityTestFailures"] = x[k];
                }
            })
        });
        if(tmpObject["NumberOfSanityTestFailures"]){
            console.log('Count' , tmpObject["NumberOfSanityTestFailures"]);
            tmpObject["AssociatedDetails"] = process.env.JIRA_Sanity_Failures;
        }
        // let containerCount = numberOfContainers.GetActualAndExpectedContainerCount(key);
        // if (containerCount) {
        //     tmpObject["ExpectedContainersToBeDeployed"] = containerCount["ExpectedCount"];
        //     tmpObject["ActualContainersDeployed"] = containerCount["ActualCount"];
        // }
        deploymentPerService.ServiceDeployments[0]['services'].push(tmpObject);
    });
    //Rollbacks score
    Object.keys(mockFailureObj).forEach(function (key) {
        var tmpObject = new Object();
        tmpObject["name"] = key;
        tmpObject[options.SuccessText] = 0;
        if (mockFailureObj[key]) {
            tmpObject[options.FailureText] = mockFailureObj[key];
        }
        else {
            tmpObject[options.FailureText] = 0;
        }
        if (tmpObject["score"]) {
            tmpObject["score"] = tmpObject["score"] - mockFailureObj[key];
        } else {
            tmpObject["score"] = 0 - mockFailureObj[key];
        }
        numberOfSanityTestFailures.map(x => {
            Object.keys(x).map(function (k) {
                if (k == key) {
                    if (tmpObject["score"]) {
                        tmpObject["score"] = tmpObject["score"] - (scoreConstants.SANITY_TEST_FAILURE_SCORE * x[k]);
                    }
                    else {
                        tmpObject["score"] = 0 - (scoreConstants.SANITY_TEST_FAILURE_SCORE * x[k]);
                    }
                    tmpObject["NumberOfSanityTestFailures"] = x[k];
                }
            })
        });
        if(tmpObject["NumberOfSanityTestFailures"]){
            console.log('Count' , tmpObject["NumberOfSanityTestFailures"]);
            tmpObject["AssociatedDetails"] = process.env.JIRA_Sanity_Failures;
        }
        // let containerCount = numberOfContainers.GetActualAndExpectedContainerCount(key);
        // if (containerCount) {
        //     tmpObject["ExpectedContainersToBeDeployed"] = containerCount["ExpectedCount"];
        //     tmpObject["ActualContainersDeployed"] = containerCount["ActualCount"];
        // }
        deploymentPerService.ServiceDeployments[0]['services'].push(tmpObject);
    });
    //Other services that are neither deployed nor rolledback score
    Object.keys(standaloneObj).forEach(function (key) {
        var tmpObject = new Object();
        tmpObject["name"] = key;
        tmpObject[options.SuccessText] = 0;
        tmpObject[options.FailureText] = 0;
        tmpObject["score"] = 0;
        numberOfSanityTestFailures.map(x => {
            Object.keys(x).map(function (k) {
                if (k == key) {
                    if (tmpObject["score"]) {
                        tmpObject["score"] = tmpObject["score"] - (scoreConstants.SANITY_TEST_FAILURE_SCORE * x[k]);
                    }
                    else {
                        tmpObject["score"] = 0 - (scoreConstants.SANITY_TEST_FAILURE_SCORE * x[k]);
                    }
                    tmpObject["NumberOfSanityTestFailures"] = x[k];
                }
            })
        });
        if(tmpObject["NumberOfSanityTestFailures"]){
            console.log('Count' , tmpObject["NumberOfSanityTestFailures"]);
            tmpObject["AssociatedDetails"] = process.env.JIRA_Sanity_Failures;
        }
        // let containerCount = numberOfContainers.GetActualAndExpectedContainerCount(key);
        // if (containerCount) {
        //     tmpObject["ExpectedContainersToBeDeployed"] = containerCount["ExpectedCount"];
        //     tmpObject["ActualContainersDeployed"] = containerCount["ActualCount"];
        // }
        deploymentPerService.ServiceDeployments[0]['services'].push(tmpObject);
        deploymentPerService.ServiceDeployments[0]['services'] = deploymentPerService.ServiceDeployments[0]['services'].sort(function (a, b) { return a.score - b.score; });
        deploymentPerService.ServiceDeployments[0]['bottom5Services'] = deploymentPerService.ServiceDeployments[0]['services'].slice(0, 5)
            .filter(itm => itm.score > 0 || itm.NumberOfDeployments > 0 || itm.NumberOfRollbacks > 0 || itm.NumberOfSanityTestFailures > 0);
    });
    deploymentPerService.ServiceDeployments[0]['services'] = deploymentPerService.ServiceDeployments[0].services.filter(itm =>
        itm.score > 0 || itm.NumberOfDeployments > 0 || itm.NumberOfRollbacks > 0 || itm.NumberOfSanityTestFailures > 0
    );
    return JSON.stringify(deploymentPerService);
}