import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
// index.js is the first folder hit when looking through that folder so we can just say the folder name in this case
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <AuthWrapper>
      <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <Dashboard></Dashboard>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="*">
          <Error></Error>
        </Route>
      </Switch>
    </Router>
    </AuthWrapper>
  );
}

export default App;
