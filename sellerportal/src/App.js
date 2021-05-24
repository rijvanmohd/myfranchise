import React, { Suspense } from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/accounts/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import { InfoProvider } from "./context/authContext";

function App() {

  return (
    <InfoProvider>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Suspense fallback={<div>Page is Loading...</div>}>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} type="private"/>
              <PrivateRoute exact path="/login" component={Login} type="guest"/>
            </Switch>
          </Suspense>
        </Router>
      </SnackbarProvider>
    </InfoProvider>
  );
}

export default App;
