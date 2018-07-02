import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
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
};

export function logError(errors) {
    return {
        type: LOG_ERROR,
        payload: errors
    }
};

export function checkStatus(monitor) {
    console.log("Incoming Monitor Object - " + JSON.stringify(monitor));
    for (let index = 0; index < monitor.monitorList.length; index++) {
        console.log("Check Status For Loop - " + JSON.stringify(monitor.monitorList[index]));
        let monitorStatusObj = {
            monitorList: [{
                id: monitor.monitorList[index].id,
                url: monitor.monitorList[index].url,
                isActive: monitor.monitorList[index].isActive,
                name: monitor.monitorList[index].name
            }],
            errors: {}
        }
        return (dispatch) => {
            try {
                var options = {
                    url: monitorStatusObj.url,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Request-Method': '*',
                        'Access-Control-Allow-Methods': 'GET',
                        'Access-Control-Allow-Headers': '*'
                    }
                };

                https.get(options, function (res) {
                    // console.log("Action : " + url + " - statusCode : " + res.statusCode);
                    res.on('data', function (data) {
                        if (res.statusCode !== 200) {
                            console.error("Err: " + res.statusMessage);
                            monitor = { ...monitorStatusObj, errors: { status: JSON.stringify(url + ": Err - " + res.statusMessage) } };
                            console.log("Action returns !200: " + JSON.stringify(monitor));
                            dispatch({
                                type: MONITOR_STATUS,
                                payload: monitor
                            })
                        }
                        else {
                            // console.log("Success! - " + JSON.stringify(res.statusCode) + " " + JSON.stringify(res.statusMessage));
                            let monitorObj = {
                                id: monitorStatusObj.monitorList[0].id,
                                isActive: true,
                                name: monitorStatusObj.monitorList[0].name,
                                url: monitorStatusObj.monitorList[0].url
                            };
                            monitor = {
                                ...monitorStatusObj,
                                monitorList: [
                                    ...monitorStatusObj.monitorList[0],
                                    monitorObj
                                ]
                            }
                            console.log("Action returns 200: " + JSON.stringify(monitor));
                            dispatch({
                                type: MONITOR_STATUS,
                                payload: monitor
                            })
                        }
                    });
                }).on('error', function (errors) {
                    console.error("Err: " + errors);
                    monitor = { ...monitorStatusObj, errors: { status: JSON.stringify("RequestError: " + url + ": " + errors) } };
                    // console.log("Action returns: " + JSON.stringify(monitor));
                    dispatch({
                        type: LOG_ERROR,
                        payload: monitor
                    })
                });
            }
            catch (errors) {
                console.error(errors);
                monitor = { ...monitor, errors: { errors } };
                // console.log("Action returns: (errors) - " + JSON.stringify(monitor));
                dispatch({
                    type: LOG_ERROR,
                    payload: monitor
                })
            }
        }

    }
};

// export function taskScheduler(monitors) {

//     console.log("Monitors Object - " + JSON.stringify(monitors) + " - " + monitors.monitorList.length);
//     if (!isEmpty(monitors)) {
//         if (monitors.monitorList.length > 0) {
//             console.log("Monitor List - " + JSON.stringify(monitors.monitorList));
//             checkStatus(monitors);
//         }
//     }
// }