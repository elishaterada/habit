import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import App from '../views/App';
import Dashboard from '../views/Dashboard';
import Callback from '../views/Callback';
import Auth from './Auth';
import history from './History';
import client from './Apollo';
import Navigation from '../components/Navigation';

class Routes extends React.Component{
  render = () => {
    const auth = new Auth();

    const handleAuthentication = (nextState, replace) => {
      if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
      }
    }

    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <div>
            <Navigation
              auth={auth}
            />
            <Route
              exact path="/"
              component={App}
            />
            <Route
              path="/dashboard"
              render={(props) => <Dashboard auth={auth} {...props} />}
            />
            <Route
              path="/callback"
              render={(props) => {
                handleAuthentication(props);
                return <Callback {...props}/>
              }}
            />
          </div>
        </Router>
      </ApolloProvider>
    )
  };
}

export default Routes;
