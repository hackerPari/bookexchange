import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import injectReducer from 'utils/injectReducer';
import { makeAuthData, makeHasApiErrorOccurred } from './selectors';
import { getUserDetail, resetApiErrorFlag } from './actions';
import reducer from './reducer';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
  resetApiErrorFlag: () => dispatch(resetApiErrorFlag())
});

const mapStateToProps = createStructuredSelector({
  authData: makeAuthData(),
  hasApiErrorOccurred: makeHasApiErrorOccurred()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'global', reducer });

export default compose(withReducer, withRouter, withConnect)(App);
export { mapDispatchToProps };
