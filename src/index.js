import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './app';
import history from './store/history';
import configureStore from './store/configure-store';
import rootReducer from './store/root-reducer';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });

  module.hot.accept('./store/root-reducer', () => {
    store.replaceReducer(rootReducer);
  });
}
