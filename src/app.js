import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Loading from '@/components/Loading';
import './styles/index.scss';

const Todo = lazy(() => import('@/pages/todo'));
const Loan = lazy(() => import('@/pages/loan'));

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <Suspense fallback={<Loading isLoading />}>
        <Switch>
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/" component={Loan} />
          <Route component={() => <div>404 Not found</div>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
