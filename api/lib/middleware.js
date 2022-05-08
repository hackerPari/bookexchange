const md5 = require('blueimp-md5');
const userHelper = require('../db-helpers/user');
const responseUtil = require('./response');
const expressJwt = require('express-jwt');


const validateJWT = async function (req, res, next) {
  try {
    validateJwt = expressJwt({
      secret: 'exchange-secret'
    });
    next();
  } catch (e) {
    return res.send({})
  }
}


const userInfo = async function (req, res, next) {
  let response = responseUtil.responseObj();

  req.startTime = new Date();
  if (req.user) {
    let user = await userHelper.findUserById(req.user._id);
    if (!user || !user._id) {
      response.status = responseUtil.setErrorMessage('userNotAvailable', 401);
      responseUtil.sendResponse(req, res, response);
    } else if (new Date(req.user.timestamp) < user.invalidateTokenAt) {
      response.status = responseUtil.setErrorMessage('forceLogout', 401);
      res.status(401).send(response);
    } else {
      req.user = user;
      next();  
    }
  } else {
    next();
  }
};

const openAPIAuthentication = async function (req, res, next) {
  req.startTime = new Date();
  next();
}

module.exports = {
  userInfo,
  openAPIAuthentication,
  validateJWT
}