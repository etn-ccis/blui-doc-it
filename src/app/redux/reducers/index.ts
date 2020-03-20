import { combineReducers } from 'redux';
import { CHANGE_PAGE_TITLE, CHANGE_COLOR_FORMAT } from '../actions';
// import { connectRouter } from 'connected-react-router';
// import { History } from 'history';
// import { AppActions } from '../actions/actionTypes';

export type AppState = {
    app: CommonState;
};
type CommonState = {
    pageTitle: string;
    colorFormat: 'rgb' | 'hex';
};
const initialAppState: CommonState = {
    pageTitle: '',
    colorFormat: 'hex',
};
const appReducer = (state = initialAppState, action: any): CommonState => {
    switch (action.type) {
        case CHANGE_PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.payload,
            };
        case CHANGE_COLOR_FORMAT:
            return {
                ...state,
                colorFormat: action.payload,
            };
        default:
            return state;
    }
};
export const Reducer = (): any =>
    combineReducers<AppState>({
        app: appReducer,
    });
