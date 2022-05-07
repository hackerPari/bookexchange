import React from 'react';
import { Switch, Route, Redirect, Router, HashRouter } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';
import Login from './Login';
import Listing from './Listing';
import BookProfile from './BookProfile';

class Books extends React.PureComponent {
 
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/books/listing" component={Listing} />
            <Route path="/books/profile" component={BookProfile} />
            <Route path="/books/login" component={Login} />
            <Redirect exact from="/books" to="/books/listing" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default Books;
