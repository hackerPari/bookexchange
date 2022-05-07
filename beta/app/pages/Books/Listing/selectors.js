import { createSelector } from 'reselect';

const listing = function (state) {
  return state.get('listing');
};
const getBooks = () => createSelector(
  listing,
  (state) => state.get('books')
);

const getErrorObj = () => createSelector(
  listing,
  (state) => state.get('errorObj')
);

const exchangeStatus = () => createSelector(
  listing,
  (state) => state.get('exchangeStatus')
);


export {
  listing,
  getBooks,
  getErrorObj,
  exchangeStatus
};
