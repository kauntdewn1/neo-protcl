import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Providers
import Web3ModalProvider from './providers/Web3ModalProvider';
// import TWProvider from './providers/ThirdwebProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <App />
    </Web3ModalProvider>
  </React.StrictMode>
);

