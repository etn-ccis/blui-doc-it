import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import configureStore from './app/util/store';
import './app/util/polyfills';
//import registerServiceWorker from './app/registerServiceWorker';
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
