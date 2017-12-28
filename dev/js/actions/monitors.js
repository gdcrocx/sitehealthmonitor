import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function addMonitor(newMonitor) {
    console.log("Action: You added a new monitor: " + JSON.stringify(newMonitor));
    return {
        type: 'MONITOR_ADDED',
        newMonitor
    }
};

export function deleteMonitor(monitor) {
    console.log("Action: You deleted a new monitor: " + JSON.stringify(monitor));
    return {
        type: 'MONITOR_DELETED',
        monitor
    }
};

export function validateInput(data) {

    console.log("Validation Data : " + JSON.stringify(data));
    let errors = {};

    if (Validator.isEmpty(data)) {
        errors.url = 'This field is required';
    }

    if (!Validator.isURL(data)) {
        errors.url = 'The URL is invalid';
    }
    
    console.log("Validation Errors : " + JSON.stringify(errors));

    return {
        errors,
        isValid: isEmpty(errors)
    }
}