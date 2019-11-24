import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'cato-react-store';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
