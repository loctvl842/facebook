import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthStoreProvider } from './context/AuthContext/store';
import { FeedStoreProvider } from './context/FeedContext/store';

ReactDOM.render(
  <React.StrictMode>
    <AuthStoreProvider>
      <FeedStoreProvider>
        <App />
      </FeedStoreProvider>
    </AuthStoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
