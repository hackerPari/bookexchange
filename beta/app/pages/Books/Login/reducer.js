/*
 * Student Reducer
 */
import { fromJS } from 'immutable';

import { LOAD_USER_DETAIL, LOAD_USER_DETAIL_SUCCESS, LOAD_USER_DETAIL_ERROR, SIGNUP_SUCCESS, LOGIN_SUCCESS, SIGNUP_ERROR, SIGNUP_REQUEST, LOGIN_REQUEST, LOGIN_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  error: false,
  signInDetails: null,
  loginStatus: null
});

function reviewerReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return state.set('loginStatus', null);
    case LOGIN_REQUEST:
      return state.set('loginStatus', null);
    case SIGNUP_SUCCESS:
      return state.set('signInDetails', action.data)
    case LOGIN_SUCCESS:
      return state.set('signInDetails', action.data)
    case SIGNUP_ERROR:
      return state.set('loginStatus', action.data)
    case LOGIN_ERROR:
      return state.set('loginStatus', action.data)
    default:
      return state;
  }
}

export default reviewerReducer;
