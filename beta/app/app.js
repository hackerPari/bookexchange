/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'pages/App';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
// import '!file-loader?name=[name].[ext]!./images/fav.png';
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import 'styles/theme.scss';

import configureStore from './configureStore';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    },
    secondary: {
      main: orange[800]
    }
  },
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

// insertion point for material-ui css
const styleNode = document.createElement('style');
styleNode.id = 'insertion-point-jss';
document.head.insertBefore(styleNode, document.head.firstChild);

// Configure JSS
const jss = create(jssPreset());
jss.options.createGenerateClassName = createGenerateClassName;
jss.options.insertionPoint = document.getElementById('insertion-point-jss');

const render = () => {
  ReactDOM.render(
    <JssProvider jss={jss}>
      <Provider store={store}>
        {/* <LanguageProvider messages={messages}> */}
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </ConnectedRouter>
        {/* </LanguageProvider> */}
      </Provider>
    </JssProvider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['pages/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
