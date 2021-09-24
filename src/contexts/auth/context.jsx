import { createContext, useContext, useReducer, useEffect } from 'react';
import { authReducer } from './reducer';
import { loginUser, signUpUser } from './services';
import { useUser } from '../user/context';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialState = {
    token: null,
    error: null,
    status: 'idle',
  };
  const { dispatchUser } = useUser();

  const [auth, dispatchAuth] = useReducer(authReducer, initialState);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) loginUser(dispatchAuth, dispatchUser, { authToken });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, dispatchAuth, loginUser, signUpUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
