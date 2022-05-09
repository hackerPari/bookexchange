/*
 * Auth module
 */

import React from 'react';
import { Redirect, Route, HashRouter, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import Books from 'pages/Books';

class Auth extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (Cookies.get('token')) {
      const userAuthData = {
        userId: Cookies.get('id'),
        username: Cookies.get('name'),
        userRole: Cookies.get('role')
      };
      this.props.authDataLoaded(userAuthData);
    } else {
      this.props.authDataLoadingError();
    }
  }

  render() {
    const userRole = this.props.userRole;
    return(
      <HashRouter>
        <Switch>
          <Route path='/books' component={Books} />
          <Redirect exact from='/' to='/books/listing' />;
        </Switch>
      </HashRouter>
    )
  }
}

export default Auth;
