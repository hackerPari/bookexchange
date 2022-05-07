'use strict';

const expressJwt = require('express-jwt');
const validateJwt = expressJwt({
  secret: 'assess-ui-secret'
});

const middleware = require('./lib/middleware');
const auth = require('./controllers/auth');
const bookexchange = require('./controllers/bookexchange');
const express = require('express');
const app = express.Router();

  // app.use(validateJwt.unless({path: openAPIs}));

  app.post('/api/auth/login', middleware.openAPIAuthentication, auth.login);
  app.post('/api/auth/signup', auth.signup);
  
  app.post('/api/books/exchange', validateJwt, middleware.userInfo, bookexchange.exchangeRequest);
  app.get('/api/books/list', validateJwt, middleware.userInfo, bookexchange.list);
  app.get('/api/books/profile', validateJwt, middleware.userInfo, bookexchange.getBooksProfile);
  
module.exports = app;
