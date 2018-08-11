import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from './store/configure-store';
import Master from './layout/master';
import App from './app';
import Todo from './page/todo';

export default function Routes() {
	const history = createHistory();
	const store = configureStore({ history });

	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Master>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={App} />
							<Route path="/todo" component={Todo} />
							<Route component={() => (<div>404 Not found</div>)} />
						</Switch>
					</BrowserRouter>
				</Master>
			</ConnectedRouter>
		</Provider>
	);
}
