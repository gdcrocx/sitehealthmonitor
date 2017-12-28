export const addMonitor = (newMonitor) => {
    console.log("You added a new monitor: " + JSON.stringify(newMonitor));
    return {
        type: 'MONITOR_ADDED'
    }
};