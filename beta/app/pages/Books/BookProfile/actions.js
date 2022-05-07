import * as constants from './constants';

export function bookProfileRequest() {
  return {
    type: constants.PROFILE_REQUEST
  }
}

export function bookProfileRequestError(data) {
  return {
    type: constants.PROFILE_REQUEST_ERROR,
    data
  }
}

export function bookProfileRequestSuccess(data) {
  return {
    type: constants.PROFILE_REQUEST_SUCCESS,
    data
  }
}