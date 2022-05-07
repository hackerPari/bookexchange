import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LIST_REQUEST, BOOK_EXCHANGE_REQUEST } from './constants';
import { list, listError, listSuccess, exchangeSuccess, exchangeError } from './actions';
import { apiErrorOccurred } from 'pages/App/actions';
import request from 'utils/request';
import { NODE_API_BASE_URL } from 'config';

export function* listBooks() {
  const requestURL = `${NODE_API_BASE_URL}/api/books/list`;
  try {
    const response = yield call(request, requestURL);
    if (response.books) {
      yield put(listSuccess(response.books));
    } else {
      yield put(listError(response.status));
    }
    
  } catch (err) {
    yield put(apiErrorOccurred(err));
  }
}

export function* exchangeRequest(action) {
  console.log('coming here?')
  const requestURL = `${NODE_API_BASE_URL}/api/books/exchange`;
  try {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(action.data)
    }
    const response = yield call(request, requestURL, options);
    if (response.exchangeStatus) {
      yield put(exchangeSuccess(response.exchangeStatus));
    } else {
      yield put(exchangeError(response.status));
    }
    
  } catch (err) {
    yield put(apiErrorOccurred(err));
  }
}

export default function* bookListingSaga() {
  yield takeLatest(LIST_REQUEST, listBooks);
  yield takeLatest(BOOK_EXCHANGE_REQUEST, exchangeRequest);
}
