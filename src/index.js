import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles and TailwindCSS
import App from './App';

// Create the root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
