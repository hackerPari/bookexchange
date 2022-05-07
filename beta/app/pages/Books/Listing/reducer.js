/*
 * Student Reducer
 */
import { fromJS } from 'immutable';

import * as constants from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  error: false,
  books: [],
  errorObj: null,
  exchangeStatus: null
});

function reviewerReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LIST_REQUEST:
      return state.set('books', []).set('errorObj', null);
    case constants.LIST_SUCCESS:
      return state.set('books', action.data)
    case constants.LIST_ERROR:
      return state.set('errorObj', action.data)
    case constants.BOOK_EXCHANGE_REQUEST:
      return state.set('exchangeStatus', null);
    case constants.BOOK_EXCHANGE_ERROR:
      return state.set('errorObj', action.data)
    case constants.BOOK_EXCHANGE_SUCCESS:
      return state.set('exchangeStatus', action.data)
    default:
      return state;
  }
}

export default reviewerReducer;
