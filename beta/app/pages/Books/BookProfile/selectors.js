import { createSelector } from 'reselect';

const bookProfileState = function (state) {
  return state.get('bookProfileState');
};

const getErrorObj = () => createSelector(
  bookProfileState,
  (state) => state.get('errorObj')
);

const getBookProfile = () => createSelector(
  bookProfileState,
  (state) => state.get('bookProfile')
);


export {
  bookProfileState,
  getErrorObj,
  getBookProfile
};
