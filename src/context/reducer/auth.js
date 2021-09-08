export default function authReducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: payload.user,
        authToken: payload.authToken,
      };

    case 'SET_USER':
      return { ...state, user: payload.user };

    case 'SET_TOKEN':
      return { ...state, authToken: payload.authToken };

    default:
      return state;
  }
}
