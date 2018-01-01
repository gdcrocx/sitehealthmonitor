import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

import { MONITOR_ADDED, MONITOR_DELETED, STATUS_SUCCESS, LOG_ERROR } from '../actions/types';

exports.modifyMonitor = function (state = null, action) {
    // console.log("Monitor Reducer State : " + JSON.stringify(state));
    // console.log("Monitor Reducer Action : " + JSON.stringify(action));
    switch (action.type) {
        case MONITOR_ADDED:
            console.log('MONITOR_ADDED');            
            if (isEmpty(state)) {
                // Structure Constructor
                state = { ...state, errors: {}, monitorList: [] };                
            }
            if (!isEmpty(action.payload.errors)) {
                // console.log("Invalid Error caught, piping errors to Redux - " + JSON.stringify(action.payload.errors));                
                return { ...state, errors: action.payload.errors };
            }
            if (!isEmpty(action.payload.monitor)) {
                // console.log("Success! Piping valid input to Redux - " + JSON.stringify(action.payload.monitor));
                let newMonitorList = [ ...state.monitorList ];                
                if (isEmpty(newMonitorList)) {                    
                    if (newMonitorList.length === 0) {
                        return { monitorList: [action.payload.monitor], errors: {}}

                    }
                    return { ...state, monitorList: [action.payload.monitor], errors: {} };
                }
                else {                    
                    newMonitorList = [...newMonitorList, action.payload.monitor];
                    return { ...state, monitorList: newMonitorList, errors: {} };
                }
            }
            break;
        case MONITOR_DELETED:
            console.log('MONITOR_DELETED');
            // console.log("Reducer State: " + JSON.stringify(state.monitorList));
            // console.log("Reducer Action Payload: " + JSON.stringify(action.payload));
            let itemIndex = 0;
            let newMonitorList = [...state.monitorList];            
            for (let index = 0; index < newMonitorList.length; index++) {
                // console.log(newMonitorList.length, index, newMonitorList[index].id, action.payload.id);
                if (newMonitorList[index].id === action.payload.id) {                    
                    itemIndex = index;
                    break;
                }
            }
            if (itemIndex >= 0) {
                if (itemIndex === 0 && newMonitorList.length === 1) {
                    newMonitorList = [];
                    return newMonitorList;
                }
                else {                    
                    newMonitorList.forEach(monitor => {                        
                        if (monitor.id === action.payload.id) {
                            let newArray = newMonitorList.slice(0, itemIndex);
                            newArray = [...newArray, ...newMonitorList.slice(itemIndex + 1)];
                            newMonitorList = newArray;                            
                        }
                    });
                }
                return { ...state, monitorList: newMonitorList };
            }
            break;
        case STATUS_SUCCESS:
            console.log('STATUS_SUCCESS');
            // console.log("Reducer State: " + JSON.stringify(state));        
            // console.log("Reducer Action Payload: " + JSON.stringify(action.payload));
            // state = {...state, isActive: action.isActive};
            // return state;
            break;
        case LOG_ERROR:
            return { ...state, errors: action.payload.errors }; 
            break;
        default:
            return state;
    }
    return state;
}