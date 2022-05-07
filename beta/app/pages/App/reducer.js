/*
 * AppReducer
 */
import { fromJS } from 'immutable';

import { LOAD_USER_AUTH_SUCCESS, LOAD_USER_AUTH_ERROR, API_ERROR, RESET_API_ERROR_FLAG } from './constants';

// The initial state of the App
const initialState = fromJS({
  authData: {
    loading: true,
    userRole: null,
    userId: null,
    username: null,
    error: false,
  },
  hasApiErrorOccurred: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_AUTH_SUCCESS:
      return state
        .setIn(['authData', 'username'], action.username)
        .setIn(['authData', 'userRole'], action.userRole)
        .setIn(['authData', 'userId'], action.userId)
        .setIn(['authData', 'loading'], false);

    case LOAD_USER_AUTH_ERROR:
      return state
        .setIn(['authData', 'error'], true)
        .setIn(['authData', 'loading'], false);

    case API_ERROR:
      return state
        .set('hasApiErrorOccurred', true);

    case RESET_API_ERROR_FLAG:
      return state
        .set('hasApiErrorOccurred', false);

    default:
      return state;
  }
}

export default appReducer;
