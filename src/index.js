import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'cato-react-store';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import App from './App';
import './index.css';

ReactDOM.render(
  <StoreProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root'),
);
