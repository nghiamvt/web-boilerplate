import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './css/index.scss';

const Todo = lazy(() => import('@/pages/todo'));
const Home = lazy(() => import('@/pages/home'));

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route exact path="/home" component={Home} />
          <Route component={() => (<div>404 Not found</div>)} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
