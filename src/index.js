import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { LoginProvider } from './context/LoginProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <LoginProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </LoginProvider>
  // </React.StrictMode>
);
