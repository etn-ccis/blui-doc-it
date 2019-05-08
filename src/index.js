import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import configureStore from './app/util/store';
import './app/util/polyfills';
//import registerServiceWorker from './app/registerServiceWorker';
import ReactGA from 'react-ga';
import { gaID } from './ga.js';
if( gaID ){
  ReactGA.initialize('UA-139646200-2');
}
require('typeface-open-sans');
const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
//registerServiceWorker();
