export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, status: 'loading' };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: 'success',
        token: action.payload.authToken,
        error: null,
      };

    case 'LOGIN_FAILED':
      return {
        ...state,
        status: 'failed',
        token: null,
      };

    case 'LOGOUT_AUTH':
      return {
        token: null,
        error: null,
        status: 'idle',
      };

    case 'SIGNUP_REQUEST':
      return {
        ...state,
        status: 'loading',
      };

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        status: 'success',
        token: action.payload.authToken,
        error: null,
      };

    case 'SIGNUP_FAILED':
      return {
        ...state,
        status: 'failed',
        token: null,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
