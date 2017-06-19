/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Routes from './routes';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        window.document.getElementById('root'),
    );
};

render(Routes);

// Hot Module Replacement API
if (module.hot) {
    // $FlowFixMe
    module.hot.accept('./routes', () => render(Routes));
}
