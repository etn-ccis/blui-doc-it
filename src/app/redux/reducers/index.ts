import { combineReducers } from 'redux';
import {
    CHANGE_PAGE_TITLE,
    CHANGE_COLOR_FORMAT,
    TOGGLE_DRAWER,
    TOGGLE_SEARCH,
    TOGGLE_SIDEBAR,
    TOGGLE_TOC,
    SHOW_BANNER,
    HIDE_BANNER,
} from '../actions';

export type AppState = {
    app: CommonState;
};
export type CommonState = {
    pageTitle: string;
    colorFormat: 'rgb' | 'hex';
    drawerOpen: boolean;
    searchActive: boolean;
    sidebarOpen: boolean;
    hasTOC: boolean;
    showBanner: boolean;
};
const initialAppState: CommonState = {
    pageTitle: '',
    colorFormat: 'hex',
    drawerOpen: false,
    searchActive: false,
    sidebarOpen: false,
    hasTOC: false,
    showBanner: !window.sessionStorage.getItem('banner-dismissed'),
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
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarOpen: action.payload,
            };
        case TOGGLE_TOC:
            return {
                ...state,
                hasTOC: action.payload,
            };
        case SHOW_BANNER:
            return {
                ...state,
                showBanner: true,
            };
        case HIDE_BANNER:
            return {
                ...state,
                showBanner: false,
            };
        default:
            return state;
    }
};
export const Reducer = (): any =>
    combineReducers<AppState>({
        app: appReducer,
    });
