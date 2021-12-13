import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { hydrate, render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { CartProvider } from "react-use-cart";
import dotenv from 'dotenv';
import './index.css';
dotenv.config();
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = 'DPucThlDOitqSIG9Cfg5VHul6s0LOaJY';
const rootElement = document.getElementById('root');
const hasChildNodes = !!rootElement?.hasChildNodes();

hasChildNodes
  ? hydrate(<App/>, rootElement)
  : render(<App/>, rootElement);
ReactDOM.render( 
 
<>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  <CartProvider></CartProvider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();