import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reduceReducers } from 'utils/store';

import dataReducer from './dataReducer';
import defaultState from './defaultState';

// Put new reducers here
const reducers = {
    router: routerReducer,
};
const defaultReducer = (s = {}) => s;
const finalCombinedReducers = combineReducers(
    Object.keys(defaultState).reduce((result, key) => {
        return Object.assign({}, result, {
            [key]: reducers[key] ? reducers[key] : defaultReducer,
        });
    }, reducers),
);
const rootReducer = reduceReducers(finalCombinedReducers, dataReducer);
export default rootReducer;
