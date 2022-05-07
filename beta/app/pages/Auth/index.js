import { connect } from 'react-redux';
import { userAuthLoaded, userAuthLoadingError } from 'pages/App/actions';
import Auth from './Auth';

const mapDispatchToProps = (dispatch) => ({
  authDataLoaded: (userAuthData) => dispatch(userAuthLoaded(userAuthData)),
  authDataLoadingError: () => dispatch(userAuthLoadingError())
});

export default connect(null, mapDispatchToProps)(Auth);
