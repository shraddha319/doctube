import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import {
  UserProvider,
  ToastProvider,
  VideosProvider,
  AuthProvider,
} from './contexts';

ReactDOM.render(
  <StrictMode>
    <Router>
      <ToastProvider>
        <VideosProvider>
          <UserProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </UserProvider>
        </VideosProvider>
      </ToastProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
