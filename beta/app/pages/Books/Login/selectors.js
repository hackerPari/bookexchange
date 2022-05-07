import { createSelector } from 'reselect';

const selectReviewer = function (state) {
  return state.get('reviewer');
};

const getSignInDetails = () => createSelector(
  selectReviewer,
  (state) => state.get('signInDetails')
);

const getLoginStatus = () => createSelector(
  selectReviewer,
  (state) => state.get('loginStatus')
)

export {
  selectReviewer,
  getSignInDetails,
  getLoginStatus
};
