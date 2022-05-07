import * as constants from './constants';

export function signup(data) {
  return {
    type: constants.SIGNUP_REQUEST,
    data
  }
}

export function signupError(data) {
  return {
    type: constants.SIGNUP_ERROR,
    data
  }
}

export function signupSuccess(data) {
  return {
    type: constants.SIGNUP_SUCCESS,
    data
  }
}

export function login(data) {
  return {
    type: constants.LOGIN_REQUEST,
    data
  }
}

export function loginError(data) {
  return {
    type: constants.LOGIN_ERROR,
    data
  }
}

export function loginSuccess(data) {
  return {
    type: constants.LOGIN_SUCCESS,
    data
  }
}
