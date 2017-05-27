import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import middleware from '../middleware';
import rootReducer from './index.reducer';
import rootSaga from './index.saga';

export default function configureStore({ history }) {
    const sagaMiddleware = createSagaMiddleware();
    const routeMiddleWare = routerMiddleware(history);
    // eslint-disable-next-line no-underscore-dangle
    const reduxDEC = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = (process.env.NODE_ENV !== 'production' && reduxDEC) ? reduxDEC({}) : compose;
    const store = createStore(rootReducer, undefined, composeEnhancers(
        applyMiddleware(...middleware, routeMiddleWare, sagaMiddleware),
    ));
    sagaMiddleware.run(rootSaga);

    return store;
}
