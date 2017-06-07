import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reduceReducers } from './utils';
import dataReducer from './data.reducer';
import defaultState from './defaultState';

// Put new reducers here
const reducers = {
    router: routerReducer,
};
const defaultReducer = (s = {}) => s;
const combinedReducer = combineReducers(
    Object.keys(defaultState).reduce((result, key) => {
        return Object.assign({}, result, {
            [key]: reducers[key] ? reducers[key] : defaultReducer,
        });
    }, reducers),
);
const rootReducer = reduceReducers(combinedReducer, dataReducer);
export default rootReducer;
