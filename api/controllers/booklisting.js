const bookHelper = require('../db-helpers/book');
const responseUtil = require('../lib/response');
const userHelper = require('../db-helpers/user')
const exchangeRequestHelper = require('../db-helpers/exchangeRequest');
const ObjectId = require('mongoose').Types.ObjectId;
const book = require('../models/book');

const list = async function (req, res) {
  req.apiName = 'listBooks';
  let response = responseUtil.responseObj();
  try {
    const favoriteCategories = req.user.favoriteCategories;
    const query = {}
    if (favoriteCategories && favoriteCategories.length > 0) {
        query.category = {'$in': favoriteCategories};
    }
    // query.count = {'$gt': 0};
    let books = await bookHelper.getBooks(query);
    response.books = books;
  } catch (e) {
    response.status = responseUtil.getErrorResponse(e, 'listBooksFailed');
  }
  responseUtil.sendResponse(req, res, response);
}

const getBooksProfile = async function (req, res) {
    req.apiName = 'booksProfile';
    let response = responseUtil.responseObj();
    try {
        const {user} = req;
        const bookProfile = {
            'bookRequests': user.bookRequests ? user.bookRequests : [],
            'booksLent': user.booksLent ? user.booksLent : [],
            'booksOwed': user.booksOwed ? user.booksOwed : [],
            'booksOwned': user.booksOwned ? user.booksOwned: [],
            'points': user.points ? user.points : 0
        };
        response.bookProfile = bookProfile;
    } catch (e) {
        response.status = responseUtil.getErrorResponse(e, 'booksProfileFailed');
    }
    responseUtil.sendResponse(req, res, response);
}

module.exports = {
  list,
  getBooksProfile
}