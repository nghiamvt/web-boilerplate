import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import Routes from './routes';
import configureStore from './store/configure-store';

const history = createHistory();
const store = configureStore({ history });

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root'),
);
