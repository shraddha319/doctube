import API from './config.api';

/**
 *
 * @param {Object: {
 * email: String,
 * password: String,
 * firstName: String,
 * lastName: String
 * }} user
 */
export function signUpUser(user) {
  return API.post('/users', { ...user });
}

/**
 *
 * @param {email: String, password: String, authToken: JWT} credentials
 */
export function loginUser(credentials) {
  if (credentials.email && credentials.password)
    return API.post('/auth/login', credentials);
  else
    return API.post(
      '/auth/login',
      {},
      {
        headers: { Authorization: credentials.authToken },
      }
    );
}

export function getUser(userId) {
  return API.get(`/users/${userId}`);
}
