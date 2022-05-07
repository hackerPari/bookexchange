import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { SIGNUP_REQUEST, LOGIN_REQUEST } from './constants';
import { signupSuccess, loginSuccess, loginError, signupError } from './actions';
import { apiErrorOccurred } from 'pages/App/actions';
import request from 'utils/request';
import { NODE_API_BASE_URL } from 'config';

export function* signup(action) {
  const requestURL = `${NODE_API_BASE_URL}/api/auth/signup`;
  const options = {
    'method': 'POST',
    'body': JSON.stringify(action.data)
  }
  try {
    const userDetail = yield call(request, requestURL, options);
    if (userDetail.user) {
      yield put(signupSuccess(userDetail.user));
    } else {
      yield put(signupError(userDetail.status));
    }
    
  } catch (err) {
    yield put(apiErrorOccurred(err));
  }
}

export function* login(action) {
  const requestURL = `${NODE_API_BASE_URL}/api/auth/login`;
  const options = {
    'method': 'POST',
    'body': JSON.stringify(action.data)
  }
  try {
    const userDetail = yield call(request, requestURL, options);
    if (userDetail.user) {
      yield put(loginSuccess(userDetail.user));
    } else {
      yield put(loginError(userDetail.status));
    }
    
  } catch (err) {
    yield put(apiErrorOccurred(err));
  }
}


export default function* userLoginSaga() {
  yield takeLatest(SIGNUP_REQUEST, signup);
  yield takeLatest(LOGIN_REQUEST, login);
}
