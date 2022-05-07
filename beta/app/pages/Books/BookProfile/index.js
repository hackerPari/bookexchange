import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getBookProfile, getErrorObj } from './selectors';
import { bookProfileRequest } from './actions';
import reducer from './reducer';
import saga from './sagas';
import BookProfile from './BookProfile';

const mapDispatchToProps = (dispatch) => ({
  bookProfile: () => dispatch(bookProfileRequest()),
});

const mapStateToProps = createStructuredSelector({
  books: getBookProfile(),
  errorObj: getErrorObj(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bookProfileState', reducer });
const withSaga = injectSaga({ key: 'bookProfileState', saga });

export default compose(withReducer, withSaga, withConnect)(BookProfile);
export { mapDispatchToProps };
