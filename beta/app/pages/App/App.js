/**
 * App
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import ReduxToastr from 'react-redux-toastr';
import { toastr } from 'react-redux-toastr';
import LoadingIndicator from 'components/LoadingIndicator';
import Auth from 'pages/Auth';
import './style.scss';

class App extends React.PureComponent {
  componentDidUpdate() {
    if (this.props.hasApiErrorOccurred) {
      toastr.error('Error', 'Some error has occurred. Please try again or contact support if issue persists.', {
        position: 'bottom-right',
        timeout: 5000,
      });
      this.props.resetApiErrorFlag();
    }
  }

  render() {
    if (this.props.authData.get('loading')) {
      return (
        <div>
          <Auth />
          <LoadingIndicator />
        </div>
      );
    }

     return (
      <div className="app-wrapper">
        <Helmet titleTemplate="%s - BookExchange" defaultTitle="BookExchange">
          <meta name="description" content="BookExchange" />
        </Helmet>
        <ReduxToastr />
        <Auth userRole={this.props.authData.get('userRole')} />
      </div>
    );
  }
}

export default App;
