const expectedServiceListJSON = require('./appdevproduction.json');
const actualServiceListJSON = require('./deployedcontainers.json');
var exports = module.exports = {};
exports.GetActualAndExpectedContainerCount = function (serviceName) {
    Object.keys(expectedServiceListJSON.services).map(x => {
        expectedServiceListJSON.services[x].key.name = expectedServiceListJSON.services[x].key.name.replace(/-/g, ' ');
    });
    Object.keys(actualServiceListJSON.deployments).map(x => {
        actualServiceListJSON.deployments[x].service_name = actualServiceListJSON.deployments[x].service_name.replace(/-/g, ' ');
    });
    let filteredExpectedService = expectedServiceListJSON.services.filter(itm => itm.key.name === serviceName)[0];
    let filteredActualService = actualServiceListJSON.deployments.filter(itm => itm.service_name === serviceName)[0];
    if (filteredExpectedService && filteredActualService) {
        if (filteredActualService.service_name == filteredExpectedService.key.name) {
            return { "ActualCount": filteredActualService.number_of_containers, "ExpectedCount": filteredExpectedService.options.instances };
        }
    }
};
