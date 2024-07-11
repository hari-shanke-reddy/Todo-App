import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './redux/store';// Importing the Redux store configuration
import App from './App';

// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Create a root using ReactDOM's createRoot method
const root = ReactDOM.createRoot(rootElement);

// Render the App component wrapped with the Provider component to connect to Redux store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
