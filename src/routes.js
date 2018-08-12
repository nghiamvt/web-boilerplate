import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Master from './layout/master';
import App from './app';
import Todo from './page/todo';


function Routes() {
	return (
		<Master>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={App} />
					<Route path="/todo" component={Todo} />
					<Route component={() => (<div>404 Not found</div>)} />
				</Switch>
			</BrowserRouter>
		</Master>
	);
}

export default hot(module)(Routes);
