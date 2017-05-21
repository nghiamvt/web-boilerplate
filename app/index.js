import React from 'react';
import ReactDOM from 'react-dom';

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';

import App from './App';

// TODO: find a way to set process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV : ', process.env.NODE_ENV );

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept(App, () => render(App));
}
