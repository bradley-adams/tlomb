import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OldApp from './Todo';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <OldApp />
  </React.StrictMode>,
  document.getElementById('root')
);
