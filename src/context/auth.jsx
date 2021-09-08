import { createContext, useContext, useReducer, useEffect } from 'react';
import { API, getUser } from '../api';
import authReducer from './reducer/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initState = {
    user: {
      _id: localStorage.getItem('userId') || null,
    },
    authToken: localStorage.getItem('authToken') || null,
  };

  const [auth, dispatchAuth] = useReducer(authReducer, initState);

  API.defaults.headers.common['Authorization'] = auth.authToken;

  useEffect(() => {
    (async () => {
      if (auth.authToken && auth.user._id) {
        try {
          const {
            data: {
              data: { user },
            },
            status,
          } = await getUser(auth.user._id);
          if (status === 200) {
            dispatchAuth({ type: 'SET_USER', payload: { user } });
          }
        } catch (err) {
          if (err.response && err.response.status === 403) {
            dispatchAuth({ type: 'SET_TOKEN', payload: { authToken: null } });
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
          }
        }
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
