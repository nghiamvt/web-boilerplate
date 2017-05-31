import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reduceReducers } from './utils';
import dataReducer from './data.reducer';
import defaultState from './defaultState';

const combinedReducer = combineReducers({
    todos: (s = defaultState) => s,
    router: routerReducer,
});

const rootReducer = reduceReducers(dataReducer, routerReducer);

export default rootReducer;
