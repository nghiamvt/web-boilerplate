import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import localStorageEnhancer from './local-storage-enhancer';

import middleware from '../middleware';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import defaultState from './default-state';

export default function configureStore({ history }) {
    const sagaMiddleware = createSagaMiddleware();
    const routeMiddleWare = routerMiddleware(history);
    const reduxDEC = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = (process.env.NODE_ENV !== 'production' && reduxDEC) ? reduxDEC({}) : compose;
    const store = createStore(rootReducer, defaultState, composeEnhancers(
        applyMiddleware(...middleware, routeMiddleWare, sagaMiddleware),
        // localStorageEnhancer('todomvc'),
    ));
    sagaMiddleware.run(rootSaga);

    return store;
}
