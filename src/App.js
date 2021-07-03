import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import { ContextProvider } from './contexts/AppContext';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import UpdateProfile from './pages/UpdateProfile';

class App extends Component {

  render() {
    return (
      <ContextProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/update-profile' component={UpdateProfile} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/reset' component={ResetPassword} />
          <Route component={NotFound} />
        </Switch>
      </ContextProvider>
    )
  }
}

export default App
