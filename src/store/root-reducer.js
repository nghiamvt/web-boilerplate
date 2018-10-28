/* eslint-disable default-case,no-param-reassign,no-useless-return */
import produce from 'immer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reduceReducers } from '@/utils/store';
import { isFSA } from '@/utils/isFSA';

import history from './history';
import defaultState from './default-state';
import { dataActionConst } from './data-action';
import mutable from '../utils/mutable';

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

// const DTKey = '_DATA/';
// function dataReducer(state = defaultState, action) {
//   const rIndex = action.type.indexOf(DTKey);
//   const type = (rIndex >= 0) ? action.type.substring(0, rIndex + (DTKey.length - 1)) : action.type;
//   if (Object.keys(dataActionConst).includes(type)) {
//     return immutable[type.toLowerCase()](state, action.meta._path, action.payload);
//   }
//   return state;
// }

function globalReducer(state = defaultState, action) {
  const dataType = (/(.*_DATA)\/.*/.exec(action.type) || [])[1];
  return produce(state, draft => {
    if (Object.values(dataActionConst).includes(dataType)) {
      if (!isFSA(action)) throw Error('action format is invalid');
      mutable[dataType.toLowerCase()](draft, action.meta._path, action.payload);
    }
  });
}

const reducedReducers = reduceReducers(combinedReducers, globalReducer);

export default connectRouter(history)(reducedReducers);
