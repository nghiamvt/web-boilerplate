import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dataReducer from './data.reducer';

const STORE_NAME = 'store';
const rootReducer = combineReducers({
    router: routerReducer,
    [STORE_NAME]: dataReducer,
});

export default rootReducer;
