'use strict';

const dbHelper = require('./baseDBHelper');
const ObjectId = require('mongoose').Types.ObjectId;

class BookHelper extends dbHelper {
  constructor () {
    super('book');
  }

  getBooks(query) {
    return this.model.find(query).exec();
  }
}

const bookHelper = new BookHelper();
Object.freeze(bookHelper);

module.exports = bookHelper;