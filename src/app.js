import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import asyncComponent from '@/hoc/AsyncComponent';

import './css/index.scss';

const Todo = asyncComponent(() => import('@/page/todo'));

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route component={() => (<div>404 Not found</div>)} />
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
