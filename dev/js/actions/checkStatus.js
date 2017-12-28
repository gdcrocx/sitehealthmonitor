var https = require('https');

const STATUS_SUCCESS = 'STATUS_SUCCESS';
const STATUS_FAILURE = 'STATUS_FAILURE';

exports.checkStatus = (monitorUrl) => {    

    console.log("Action : Entry URL - " + JSON.stringify(monitorUrl));
    // let url = monitorUrl;
    // let response = '';
    // https.get(url, function(res) {
    //     console.log("Action : " + url + " - statusCode : " + res.statusCode); // <======= Here's the status code
    //     // console.log("headers: ", res.headers);

    //     res.on('data', function(d) {
    //         console.log("Action : " + url + " - Success with link")
    //         response = "SUCCESS"
    //         console.log("Action : Response - " + JSON.stringify(response))
    //         return {
    //             type: STATUS_SUCCESS,
    //             text: "SUCCESS"
    //         }
    //     });

    // }).on('error', function(e) {
    //     console.error(e);
    //     response = "FAILURE";
    //     console.log("Action : Response - " + JSON.stringify(response))
    //     return {
    //         type: STATUS_FAILURE,
    //         text: "FAILURE"
    //     }
    // });
    return {
        type: STATUS_SUCCESS,
        monitorUrl
    }
};