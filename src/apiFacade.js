const BASE_URL = (import.meta.env?.VITE_API_URL || 'https://learning.deployedcode.dk').replace(/\/+$/, '');
const LOGIN_ENDPOINT = '/auth/login';
const TOKEN_KEY = 'jwtToken';

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

// Decoding is only for the UI. The backend verifies the token's signature and roles.
function getTokenData() {
  try {
    const payload = getToken()?.split('.')[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), char => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

function loggedIn() {
  const data = getTokenData();
  return Boolean(data && typeof data.exp === 'number' && data.exp * 1000 > Date.now());
}

async function handleHttpErrors(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.msg || error.message || 'API request failed (' + response.status + ')');
  }
  return response.status === 204 ? null : response.json();
}

function makeOptions(method = 'GET', addToken = false, body) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  };
  if (addToken) {
    if (!loggedIn()) throw new Error('Please log in again.');
    options.headers.Authorization = 'Bearer ' + getToken();
  }
  if (body !== undefined) options.body = JSON.stringify(body);
  return options;
}

async function login(username, password) {
  const result = await fetch(BASE_URL + LOGIN_ENDPOINT, makeOptions('POST', false, {username, password}))
    .then(handleHttpErrors);
  if (typeof result?.token !== 'string') throw new Error('No token received from the server.');
  setToken(result.token);
  if (!loggedIn()) {
    logout();
    throw new Error('The server returned an invalid or expired token.');
  }
  return result;
}

// Use this for protected endpoints once they are available in the backend.
function fetchData(path, {method = 'GET', addToken = true, body} = {}) {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Expected an API path.');
  return fetch(BASE_URL + path, makeOptions(method, addToken, body)).then(handleHttpErrors);
}

export default {setToken, getToken, getTokenData, loggedIn, login, logout, makeOptions, fetchData};
