import 'whatwg-fetch';
import fetchDefaults from 'fetch-defaults';
import Cookies from 'js-cookie';
import { unregisteredToken } from '../config';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    window.location.href = `${window.location.href}#!/auth/login`;
  }

  if (response.status === 401) {
    window.location.href = `${window.location.href}#!/auth/denied`;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Wrapper around fetch api for sending default headers
 */
const apiFetch = fetchDefaults(fetch, {
  headers: { Authorization: `Bearer ${Cookies.get('token') ? Cookies.get('token') : unregisteredToken}`, 'content-type': 'application/json' }
});

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  const modOptions = { 
      headers: {
        Authorization: `Bearer ${Cookies.get('token') ? Cookies.get('token') : unregisteredToken}`, 
        'content-type': 'application/json',
      },
      ...options
  };
  return apiFetch(url, modOptions)
    .then(checkStatus)
    .then(parseJSON);
}
