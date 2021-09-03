import { createContext, useContext, useReducer } from 'react';
import authReducer from './reducer/auth';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initState = {
    user: {},
    authToken: null,
  };

  const [auth, dispatchAuth] = useReducer(authReducer, initState);

  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
