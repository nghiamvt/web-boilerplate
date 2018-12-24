import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import history from './history';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import defaultState from './default-state';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const routeMiddleWare = routerMiddleware(history);
  const reduxDEC = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && reduxDEC ? reduxDEC({}) : compose;
  const store = createStore(
    rootReducer,
    defaultState,
    composeEnhancers(applyMiddleware(thunk, routeMiddleWare, sagaMiddleware)),
  );
  if (module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
