import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as PXBThemes from '@pxblue/react-themes';
import 'typeface-open-sans';
import 'typeface-roboto-mono';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MDXProvider } from '@mdx-js/react';
import { MainRouter } from './app/router';
import { Reducer } from './app/redux/reducers';
import ReactGA from 'react-ga';
import { gaID } from './ga.js';
if (gaID) {
    ReactGA.initialize(gaID);
}
import { componentsMap } from './__configuration__/markdown/markdownMapping';
import 'placeholder-loading/src/scss/placeholder-loading.scss';

const store = createStore(Reducer());

ReactDOM.render(
    <MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
        <CssBaseline />
        <Provider store={store}>
            <MDXProvider components={componentsMap}>
                <MainRouter />
            </MDXProvider>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
