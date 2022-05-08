const userHelper = require('../db-helpers/user');
const authHelper = require('../lib/auth');
const responseUtil = require('../lib/response');
const ObjectId = require('mongoose').Types.ObjectId;

const login = async function (req, res) {
  const reqBody = req.body;
  req.apiName = 'login';
  let response = responseUtil.responseObj();
  try {
    const user = await userHelper.getUserByEmail(reqBody.email);
    if (!user || user.length == 0) {
      response.status = responseUtil.setErrorMessage('noUserFound', 400);
    } else if (user.length > 1) {
      response.status = responseUtil.setErrorMessage('moreUsersFound');
    } else {
      const isValid = await authHelper.verifyPassword(user[0], reqBody.password)
      if (!isValid) {
        response.status = {
          isError: true,
          code: 401,
          message: 'Invalid user credentials'
        };
      } else {
        let curUser = user[0];
        userHelper.updateAppLogin(user[0]._id, req.headers['user-agent']);
        const token = authHelper.generateToken(user[0]);

        response.user = {
          id: user[0]._id.toString(),
          name: user[0].name,
          role: user[0].role,
          booksOwned: user[0].booksOwned ? user[0].booksOwned : [],
          token
        }
      }
    }
  } catch (e) {
    response.status = responseUtil.getErrorResponse(e);
  }
  responseUtil.sendResponse(req, res, response);
};

const signup = async function (req, res) {
  req.apiName = 'signup';
  let response = responseUtil.responseObj();
  try {
    const user = await userHelper.findOne({email: req.body.email});
    if (user) {
      response.status = {
        isError: true,
        code: 200,
        message: "user already exists."
      }
    } else {
      console.log("adding user");
      req.body.role = 'registeredUser';
      req.body.salt = authHelper.generateSalt();
      req.body.password = authHelper.generatePasswordHash(req.body.password, req.body.salt);
      req.body.booksOwned = await authHelper.getRandomBooks();
      const user_obj = await userHelper.save(req.body);
      response.user = authHelper.getUserObject(user_obj);
    }

  } catch(e) {
    response.status = responseUtil.getErrorResponse(e, 'signupFailed');
  }
  responseUtil.sendResponse(req, res, response);
}

module.exports = {
  login,
  signup
}