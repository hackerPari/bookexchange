import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getBooks, getErrorObj, exchangeStatus } from './selectors';
import { list, putExchangeRequest} from './actions';
import reducer from './reducer';
import saga from './sagas';
import Listing from './Listing';

const mapDispatchToProps = (dispatch) => ({
  list: () => dispatch(list()),
  exchangeRequest: (data) => dispatch((putExchangeRequest(data))),
});

const mapStateToProps = createStructuredSelector({
  books: getBooks(),
  errorObj: getErrorObj(),
  exchangeStatus: exchangeStatus()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'listing', reducer });
const withSaga = injectSaga({ key: 'listing', saga });

export default compose(withReducer, withSaga, withConnect)(Listing);
export { mapDispatchToProps };
