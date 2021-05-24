import React, { Suspense } from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/accounts/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import { InfoProvider } from "./context/authContext";

function NotFound() {
  return(
    <h2>Page Not Found</h2>
  )
}

function App() {

  return (
    <InfoProvider>
      <SnackbarProvider maxSnack={3}>
        <Router>
            <Switch>
              <Suspense fallback={<NotFound/>}>
                <PrivateRoute exact path="/" component={Dashboard} type="private"/>
                <PrivateRoute exact path="/login" component={Login} type="guest"/>
              </Suspense>
            </Switch>
        </Router>
      </SnackbarProvider>
    </InfoProvider>
  );
}

export default App;
