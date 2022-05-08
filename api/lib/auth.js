const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userDBHelper = require('../db-helpers/user');
const responseUtil = require('./response');
const bookHelper = require('../db-helpers/book');
const ObjectId = require('mongoose').Types.ObjectId;

const generateToken = function(user) {
  // TODO: move to config
  return jwt.sign({ _id: user.id, role: user.role, timestamp: new Date() }, 'assess-ui-secret', {
    expiresIn: 7 * 24 * 60 * 60
  });
};

const generatePasswordHash = function (password, salt) {
  const defaultIterations = 10000;
  const defaultKeyLength = 64;
  const salt_buffer = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt_buffer, defaultIterations, defaultKeyLength, 'SHA1')
    .toString('base64');  
}

const generateSalt = function() {
  const defaultByteSize = 16;
  return crypto.randomBytes(defaultByteSize).toString('base64');
}

const setPassword = async function (userid, password) {
  const salt = this.generateSalt();
  const passwordHash = this.generatePasswordHash(password, salt);
  const setPwd = await userDBHelper.updatePassword(userid, salt, passwordHash);
  return;
};

const verifyPassword = function (user, password) {
  const passwordHash = this.generatePasswordHash(password, user.salt);
  return passwordHash === user.password;
}

const getUserObject = function (user) {
  let auth = {
    name: user.name,
    id: user._id,
    booksOwned: user.booksOwned ? user.booksOwned : [],
    token: generateToken(user)
  };
  return auth;
};  

const getRandomBooks = async function() {
  const allBooks = await bookHelper.findAll();
  const randomBooks = [];
  var len = allBooks.length;
  for (var i=0; i<3; i++) {
    var randomIdx = getRandomInt(len-i);
    var book = allBooks[randomIdx];
    randomBooks.push({
      _id: ObjectId(),
      book: book._id,
      name: book.name,
      count: 1,
      givenCount: 0 
    })

    allBooks.splice(randomIdx, 1);
  }

  return new Promise((resolve, reject) => resolve(randomBooks));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  generateToken,
  generateSalt,
  generatePasswordHash,
  setPassword,
  verifyPassword,
  getUserObject,
  getRandomBooks
}