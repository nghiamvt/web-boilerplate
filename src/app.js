import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import asyncComponent from '@/hoc/AsyncComponent';

import './css/index.scss';

const Todo = asyncComponent(() => import('@/page/todo'));
const Home = asyncComponent(() => import('@/page/home'));

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/todo" component={Todo} />
        <Route component={() => (<div>404 Not found</div>)} />
      </Switch>
    </BrowserRouter>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
