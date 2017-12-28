/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

exports.initDefaultMonitors =  function () {
    return [
        {
            id: 1,
            name: "FirstMonitor",
            url: "http://127.0.0.1:3000",
            isActive: true
        },
        {
            id: 2,
            name: "SecondMonitor",
            url: "http://127.0.0.1:3002",
            isActive: false
        },
        {
            id: 3,
            name: "ThirdMonitor",
            url: "http://127.0.0.1:3003",
            isActive: true
        }
    ]
};

exports.checkStatus = function(state = null, action) {
    switch (action.type) {
        case 'STATUS_SUCCESS':
            return action.monitorUrl;
            break;
    }
    return state;
}

exports.addMonitor = function(state = null, action) {
    switch (action.type) {
        case 'MONITOR_ADDED':
            return action.monitor;
            break;
    }
    return state;
}

exports.deleteMonitor = function(state = null, action) {
    switch (action.type) {
        case 'MONITOR_DELETED':
            return action.monitor;
            break;
    }
    return state;
}