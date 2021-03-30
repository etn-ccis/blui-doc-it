import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MainRouter } from '../router';
import { Reducer } from '../redux/reducers';
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <MainRouter />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
