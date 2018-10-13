import { combineReducers } from 'redux';
import { reduceReducers } from '@/utils/store';
import { connectRouter } from 'connected-react-router';

import history from './history';
import dataReducer from './data-reducer';
import defaultState from './default-state';

// Put new reducers here
const reducers = {};
const defaultReducer = (s = {}) => s;
const combinedReducers = combineReducers(
  Object.keys(defaultState).reduce((result, key) => {
    return Object.assign({}, result, {
      [key]: reducers[key] ? reducers[key] : defaultReducer,
    });
  }, reducers),
);
const reducedReducers = reduceReducers(combinedReducers, dataReducer);

export default connectRouter(history)(reducedReducers);
