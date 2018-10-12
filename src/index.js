import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

import App from './app';
import configureStore from './store/configure-store';

const history = createHistory();
const store = configureStore({ history });

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
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
}
