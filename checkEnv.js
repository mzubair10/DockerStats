'use strict'
const dotenv = require('dotenv');

dotenv.load();

//let exports = module.exports = {};
exports.checkEnvironmentVariableSettings = function () {
  let requiredEnv = [
    'API_Key', 'Application_Key', 'Start_Date', 'End_Date', 'Sources', 'Tags'
  ];
  let unsetEnv = requiredEnv.filter((env) => !(typeof process.env[env] !== 'undefined'));

  if (unsetEnv.length > 0) {
    throw new Error("Required ENV variables are not set: [" + unsetEnv.join(', ') + "]");
  }
}
