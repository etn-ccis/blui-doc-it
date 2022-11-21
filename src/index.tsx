/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MDXProvider } from '@mdx-js/react';
import { MainRouter } from './app/router';
import { Reducer } from './app/redux/reducers';
import ReactGA from 'react-ga';
import { gaID } from './ga.js';

import { componentsMap } from './__configuration__/markdown/markdownMapping';

import * as BLUIThemes from '@brightlayer-ui/react-themes';
import '@brightlayer-ui/react-themes/open-sans';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/600.css';
import '@fontsource/roboto-mono/700.css';
import 'placeholder-loading/src/scss/placeholder-loading.scss';
import './index.css';
import reportWebVitals from './reportWebVitals';

if (gaID) {
    ReactGA.initialize(gaID);
}

const container = document.getElementById('root');
if (!container) throw new Error('Root Element was not found in the DOM');

const store = createStore(Reducer());
const root = ReactDOMClient.createRoot(container);

root.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(BLUIThemes.blue)}>
            <CssBaseline />
            <Provider store={store}>
                <MDXProvider components={componentsMap}>
                    <MainRouter />
                </MDXProvider>
            </Provider>
        </ThemeProvider>
    </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
