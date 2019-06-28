import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Calculator from './Calculator'

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:8000 will redirect to localhost:8000/home */}
            <Redirect exact from="/" to="/home" />
            <Route
              exact
              path="/home"
              component={Calculator}
            />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
