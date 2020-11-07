import { combineReducers } from 'redux';
import { CHANGE_PAGE_TITLE, CHANGE_COLOR_FORMAT, TOGGLE_DRAWER, TOGGLE_SEARCH } from '../actions';

export type AppState = {
    app: CommonState;
};
export type CommonState = {
    pageTitle: string;
    colorFormat: 'rgb' | 'hex';
    drawerOpen: boolean;
    searchActive: boolean;
};
const initialAppState: CommonState = {
    pageTitle: '',
    colorFormat: 'hex',
    drawerOpen: false,
    searchActive: false,
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
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: action.payload,
            };
        case TOGGLE_SEARCH:
            return {
                ...state,
                searchActive: action.payload,
            };
        default:
            return state;
    }
};
export const Reducer = (): any =>
    combineReducers<AppState>({
        app: appReducer,
    });
