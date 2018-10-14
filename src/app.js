import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import asyncComponent from '@/hoc/AsyncComponent';
import Header from '@/components/Header';

import './css/index.scss';

const Todo = asyncComponent(() => import('@/pages/todo'));
// const Home = asyncComponent(() => import('@/pages/home'));
const AppAuth = asyncComponent(() => import('@/pages/auth/components/App'));

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={AppAuth} />
          <Route exact path="/todo" component={Todo} />
          <Route component={() => (<div>404 Not found</div>)} />
        </Switch>
      </div>
    </BrowserRouter>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
