/*
 * Student Reducer
 */
import { fromJS } from 'immutable';

import * as constants from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  errorObj: null,
  bookProfile: null
});

function bookProfileReducer(state = initialState, action) {
  switch (action.type) {
    case constants.PROFILE_REQUEST:
      return state.set('bookProfile', null);
    case constants.PROFILE_REQUEST_ERROR:
      return state.set('errorObj', action.data)
    case constants.PROFILE_REQUEST_SUCCESS:
      return state.set('bookProfile', action.data)
    default:
      return state;
  }
}

export default bookProfileReducer;
