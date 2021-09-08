import API from './config.api';

export function signUpUser(user) {
  return API.post('/users', { ...user });
}

export function loginUser(credentials) {
  return API.post('/auth/login', { ...credentials });
}

export function getUser(userId) {
  return API.get(`/users/${userId}`);
}
