import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';

import Todo from '@/page/todo';
import Footer from '@/layout/footer';
import './style/index.scss';

class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <main className="app__main">
          <span>hello world 123123</span>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Todo} />
              <Route component={() => (<div>404 Not found</div>)} />
            </Switch>
          </BrowserRouter>
        </main>
        <Footer />
        <SystemAlerts alerts={app.alerts} dispatch={dispatch} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
