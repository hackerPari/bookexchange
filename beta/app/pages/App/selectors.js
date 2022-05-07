/**
 * Loginpage selectors
 */

import { createSelector } from 'reselect';

const selectGlobalAppData = (state) => state.get('global');

const makeAuthData = () => createSelector(
  selectGlobalAppData,
  (state) => state.get('authData')
);

const makeHasApiErrorOccurred = () => createSelector(
  selectGlobalAppData,
  (state) => state.get('hasApiErrorOccurred')
);

const makeUserName = () => createSelector(
  selectGlobalAppData,
  (state) => state.getIn(['authData', 'username'])
);

const makeUserId = () => createSelector(
  selectGlobalAppData,
  (state) => state.getIn(['authData', 'userId'])
);

const makeUserRole = () => createSelector(
  selectGlobalAppData,
  (state) => state.getIn(['authData', 'userRole'])
);

const makeUserAuthLoading = () => createSelector(
  selectGlobalAppData,
  (state) => state.getIn(['authData', 'loading'])
);

const makeUserAuthError = () => createSelector(
  selectGlobalAppData,
  (state) => state.getIn(['authData', 'error'])
);

export {
  selectGlobalAppData,
  makeAuthData,
  makeHasApiErrorOccurred,
  makeUserName,
  makeUserId,
  makeUserRole,
  makeUserAuthLoading,
  makeUserAuthError
};
