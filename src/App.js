import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import ResetPage from './pages/ResetPage';
import NotFound from './pages/NotFound';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={SignupPage} />
        <Route exact path='/signin' component={SigninPage} />
        <Route exact path='/reset' component={ResetPage} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
