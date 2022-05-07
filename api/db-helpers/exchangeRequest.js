'use strict';

const dbHelper = require('./baseDBHelper');
const ObjectId = require('mongoose').Types.ObjectId;

class ExchangeRequest extends dbHelper {
  constructor () {
    super('exchangeRequest');
  }
}

const exchangeRequestHelper = new ExchangeRequest();
Object.freeze(exchangeRequestHelper);

module.exports = exchangeRequestHelper;