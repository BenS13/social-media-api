/**
 * Module using axios to send requests to the inshort news api
 * @module integrations/inshorts/inshorts-api
 * https://github.com/cyberboysumanjay/Inshorts-News-API
 */

const axios = require('axios');

/**
 * Async function that returns specified data from news API
 * @param {string} category_name - Category users wants news on
 * @returns {json} - Returns result data in JSON format
 */
exports.getNewsData = async function getNewsData(category_name){
    let url = `https://inshorts.deta.dev/news?category=${category_name}`
    let result;
    
    const config = {
        method: 'get',
        url: url
    }

    result = await axios(config);
    console.log(result.status);
    //console.log(result.data);
    console.log(result.headers);

    if (result.status = 200 && result.data['success'] == true) {
        //console.log(result.data['success']);
        return result.data;
    }else{
        return undefined;
    }
}