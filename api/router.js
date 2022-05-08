'use strict';

const expressJwt = require('express-jwt');
const validateJwt = expressJwt({
  secret: 'exchange-secret'
});

const middleware = require('./lib/middleware');
const auth = require('./controllers/auth');
const bookexchange = require('./controllers/bookexchange');
const booklisting = require('./controllers/booklisting');
const express = require('express');
const app = express.Router();

  // app.use(validateJwt.unless({path: openAPIs}));

  app.post('/api/auth/login', middleware.openAPIAuthentication, auth.login);
  app.post('/api/auth/signup', auth.signup);
  
  app.post('/api/books/exchange', validateJwt, middleware.userInfo, bookexchange.exchangeRequest);
  app.post('/api/books/borrow', validateJwt, middleware.userInfo, bookexchange.borrowBook);

  app.get('/api/books/list', validateJwt, middleware.userInfo, booklisting.list);
  app.get('/api/books/profile', validateJwt, middleware.userInfo, booklisting.getBooksProfile);
  
  
module.exports = app;
