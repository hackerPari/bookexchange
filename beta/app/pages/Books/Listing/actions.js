import * as constants from './constants';

export function list() {
  return {
    type: constants.LIST_REQUEST
  }
}

export function listError(data) {
  return {
    type: constants.LIST_ERROR,
    data
  }
}

export function listSuccess(data) {
  return {
    type: constants.LIST_SUCCESS,
    data
  }
}


export function putExchangeRequest(data) {
  console.log(data);
  return {
    type: constants.BOOK_EXCHANGE_REQUEST,
    data
  }
}

export function exchangeError(data) {
  return {
    type: constants.BOOK_EXCHANGE_ERROR,
    data
  }
}

export function exchangeSuccess(data) {
  return {
    type: constants.BOOK_EXCHANGE_SUCCESS,
    data
  }
}