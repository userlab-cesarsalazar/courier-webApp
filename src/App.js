//Libs
import React, { Component } from 'react';
import { createBrowserHistory } from 'history'

//Components
import { Router, Route, Switch } from 'react-router-dom'
import AppRouter  from './Router'

//Styles
import './App.css';


//Const
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route render={props => <AppRouter {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
