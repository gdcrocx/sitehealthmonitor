import {combineReducers} from 'redux';
import {initDefaultMonitors} from './reducer-monitors';
// import ActiveUserReducer from './reducer-active-user';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    monitors: initDefaultMonitors
});

export default allReducers
