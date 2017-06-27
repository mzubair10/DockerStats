'use strict'
//let exports = module.exports = {};
exports.APIEndPoint = function () {
    let temp = '';
    let placeholdersL = require('placeholders')({
        data: {
            api_key: process.env['API_Key'], application_key: process.env['Application_Key'], start_date: process.env['Start_Date'], end_date: process.env['End_Date'],
            sources: process.env['Sources'], tags: process.env['Tags'], api_url: process.env['API_Url']
        }
    });
    console.log(placeholdersL(':api_url'));
    return placeholdersL(':api_url');
}
//console.log(placeholders(':api_url'));