import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import ResetPage from './pages/ResetPage';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import UpdateProfile from './pages/UpdateProfile';

class App extends Component {

  render() {
    return (
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/update-profile' component={UpdateProfile} />
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/signin' component={SigninPage} />
          <Route exact path='/reset' component={ResetPage} />
          <Route component={NotFound} />
        </Switch>
      </AuthProvider>
    )
  }
}

export default App
