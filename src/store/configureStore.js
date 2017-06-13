import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import middleware from '../middleware';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import defaultState from './defaultState';

export default function configureStore({ history }) {
    const sagaMiddleware = createSagaMiddleware();
    const routeMiddleWare = routerMiddleware(history);
    const reduxDEC = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = (process.env.NODE_ENV !== 'production' && reduxDEC) ? reduxDEC({}) : compose;
    const store = createStore(rootReducer, defaultState, composeEnhancers(
        applyMiddleware(...middleware, routeMiddleWare, sagaMiddleware),
    ));
    sagaMiddleware.run(rootSaga);

    return store;
}
