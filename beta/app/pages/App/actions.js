/*
 * LoginPage actions
 */

import { LOAD_USER_AUTH_SUCCESS, LOAD_USER_AUTH_ERROR, API_ERROR, RESET_API_ERROR_FLAG } from './constants';

export function userAuthLoaded(authData) {
  return {
    type: LOAD_USER_AUTH_SUCCESS,
    ...authData
  };
}

export function userAuthLoadingError() {
  return {
    type: LOAD_USER_AUTH_ERROR
  };
}

export function apiErrorOccurred() {
  return {
    type: API_ERROR
  };
}

export function resetApiErrorFlag() {
  return {
    type: RESET_API_ERROR_FLAG
  };
}
