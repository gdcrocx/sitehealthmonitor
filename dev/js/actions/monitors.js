import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
// var https = require('https');
import https from 'https';

import { MONITOR_ADDED, MONITOR_DELETED, MONITOR_STATUS, LOG_ERROR } from './types';

export function addMonitor(newMonitor) {
    // console.log("Action: You added a new monitor: " + JSON.stringify(newMonitor));
    return {
        type: MONITOR_ADDED,
        payload: newMonitor
    }
};

export function deleteMonitor(monitor) {
    // console.log("Action: You deleted an existing monitor: " + JSON.stringify(monitor));
    return {
        type: MONITOR_DELETED,
        payload: monitor
    }
};

export function validateInput(data) {

    // console.log("Validation Data : " + JSON.stringify(data));
    let errors = {};

    if (Validator.isEmpty(data.name)) {
        errors.name = 'This field is required';
    }
    if (Validator.isEmpty(data.url)) {
        errors.url = 'This field is required';
    }
    else {
        if (!Validator.isURL(data.url)) {
            errors.url = 'The URL is invalid';
        }
    }
    // console.log("Validation Errors : " + JSON.stringify(errors));
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function logError(error) {
    return {
        type: LOG_ERROR,
        payload: error
    }
}

export function checkStatus(monitor) {

    console.log("Action : Status Check URL - " + JSON.stringify(monitor));
    let url = monitor.monitor.url;
    let monitorStatus = {
        isActive: false
    };
    let response = '';
    try {
        https.get(url, function (res) {
            console.log("Action : " + url + " - statusCode : " + res.statusCode); // <======= Here's the status code
            // console.log("headers: ", res.headers);

            res.on('data', function (data) {
                console.log("Action : " + url + " - Success with link - " + data)
                response = "SUCCESS"
                console.log("Action : Response - " + JSON.stringify(response))  
                monitorStatus = { ...monitorStatus, isActive: true }                  
            });

        }).on('error', function (errors) {
            console.error(errors);
            response = "FAILURE";
            console.log("Action : Response - " + JSON.stringify(response))    
            monitorStatus = { ...monitorStatus, isActive: false }           
        });
    }
    catch (errors) {
        return {
            type: LOG_ERROR,
            payload: errors
        }
    }
    return {
        type: MONITOR_STATUS,
        payload: monitorStatus
    }
};