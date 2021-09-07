export default function authReducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: payload.user,
        authToken: payload.authToken,
      };

    default:
      return state;
  }
}
