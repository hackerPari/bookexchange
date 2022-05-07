const constants = require('../constants');

const responseObj = function () {
  let response = {};

  response.status = {
    isError: false,
    code: 200
  }
  return response;
}

const getErrorResponse = function (e, errorMsg) {
  console.log(e.message);
  console.log(e.stack);
  const message = errorMsg ? constants.errorsMap[errorMsg] : 'Internal server error';
  return {
    isError: true,
    code: 500,
    message
  }
}

const setErrorMessage = function (errorMsg, code = 500) {
  console.log('info', errorMsg);
  const message = errorMsg ? constants.errorsMap[errorMsg] : 'Internal server error';
  return {
    isError: true,
    code,
    message
  }
}

const sendResponse = function (req, res, response) {
  const status = response.status.code;
  const timeTaken = new Date() - req.startTime;
  console.log('info', `Request End - ${req.apiName} - ${response.status.code} - ${req.originalUrl} - ${timeTaken}`);
  
  if (req.apiName !== 'analytics') {
    console.log('logTime', `${new Date()},${req.apiName},${timeTaken}`)  
  }

  res.status(200).send(response);
}

const logError = function (e) {
  console.log('error', e.message)
  console.log('error', e.stack)
}

module.exports = {
  responseObj,
  getErrorResponse,
  sendResponse,
  setErrorMessage,
  logError
}