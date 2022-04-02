import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthStoreProvider } from './context/AuthContext/store';
import { FeedStoreProvider } from './context/FeedContext/store';
import { ChatStoreProvider } from './context/ChatContext/store';

ReactDOM.render(
  <React.StrictMode>
    <AuthStoreProvider>
      <FeedStoreProvider>
        <ChatStoreProvider>
          <App />
        </ChatStoreProvider>
      </FeedStoreProvider>
    </AuthStoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
