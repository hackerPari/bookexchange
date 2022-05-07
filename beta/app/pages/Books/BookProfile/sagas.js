import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PROFILE_REQUEST } from './constants';
import { bookProfileRequestSuccess, bookProfileRequestError} from './actions';
import { apiErrorOccurred } from 'pages/App/actions';
import request from 'utils/request';
import { NODE_API_BASE_URL } from 'config';

export function* getBookProfile () {
  const requestURL = `${NODE_API_BASE_URL}/api/books/profile`;
  try {
    const response = yield call(request, requestURL);
    if (response.bookProfile) {
      yield put(bookProfileRequestSuccess(response.bookProfile));
    } else {
      yield put(bookProfileRequestError(response.status));
    }
    
  } catch (err) {
    yield put(apiErrorOccurred(err));
  }
}

export default function* bookListingSaga() {
  yield takeLatest(PROFILE_REQUEST, getBookProfile);
}
