import API from './config.api';

export async function signUpUser(user) {
  return API.post('/users', { ...user });
}

export async function loginUser(credentials) {
  return API.post('/auth/login', { ...credentials });
}
