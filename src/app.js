import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import asyncComponent from '@/utils/AsyncComponent';

import './style/index.scss';

const Todo = asyncComponent(() => import('@/page/todo'));
const Footer = asyncComponent(() => import('@/layout/footer'));

class App extends React.Component {
  render() {
    return (
      <div>
        <main className="app__main">
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Todo} />
              <Route component={() => (<div>404 Not found</div>)} />
            </Switch>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
