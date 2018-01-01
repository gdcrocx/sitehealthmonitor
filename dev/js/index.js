import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/app';

const logger = createLogger();
const store = createStore(
    allReducers,
    compose(
        applyMiddleware(thunk, promise, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

// store.subscribe(() => {
//     console.log("Redux Store Changed, New State: " + JSON.stringify(store.getState()));
// })

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
