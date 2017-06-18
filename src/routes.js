import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from './store/configure-store';
import Master from './layout/master';
import App from './app';
import TodoMVC from './page/todomvc';

export default function Routes() {
    const history = createHistory();
    const store = configureStore({ history });

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Master>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/todo" component={TodoMVC} />
                        <Route component={() => (<div>404 Not found</div>)} />
                    </Switch>
                </Master>
            </ConnectedRouter>
        </Provider>
    );
}
