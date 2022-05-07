import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeUserDetail, getSignInDetails, getLoginStatus } from './selectors';
import { loadUserDetail, signup, login } from './actions';
import reducer from './reducer';
import saga from './sagas';
import Login from './Login';

const mapDispatchToProps = (dispatch) => ({
  signup: (data) => dispatch(signup(data)),
  login: (data) => dispatch(login(data))
});

const mapStateToProps = createStructuredSelector({
  signInDetails: getSignInDetails(),
  loginStatus: getLoginStatus()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'reviewer', reducer });
const withSaga = injectSaga({ key: 'reviewer', saga });

export default compose(withReducer, withSaga, withConnect)(Login);
export { mapDispatchToProps };
