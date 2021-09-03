import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { DataProvider, AuthProvider } from './context';

ReactDOM.render(
  <StrictMode>
    <Router>
      <DataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
