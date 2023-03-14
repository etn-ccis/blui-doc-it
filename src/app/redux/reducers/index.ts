import { combineReducers } from 'redux';
import { ColorType } from '../../../__types__';
import {
    CHANGE_PAGE_TITLE,
    CHANGE_COLOR_FORMAT,
    TOGGLE_DRAWER,
    TOGGLE_SEARCH,
    TOGGLE_SIDEBAR,
    TOGGLE_TOC,
    SHOW_BANNER,
    HIDE_BANNER,
    CHANGE_SELECTED_COLOR,
    TOGGLE_COLOR_CONTRAST,
    CHANGE_THEME,
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
    selectedColor: undefined | ColorType;
    showColorContrast: boolean;
    theme: string;
};
const initialAppState: CommonState = {
    pageTitle: '',
    colorFormat: 'hex',
    drawerOpen: false,
    searchActive: false,
    sidebarOpen: false,
    hasTOC: false,
    showBanner: false,
    selectedColor: undefined,
    showColorContrast: false,
    theme: 'default',
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
                showBanner: action.payload,
            };
        case HIDE_BANNER:
            return {
                ...state,
                showBanner: false,
            };
        case CHANGE_SELECTED_COLOR:
            return {
                ...state,
                selectedColor: action.payload,
            };
        case TOGGLE_COLOR_CONTRAST:
            return {
                ...state,
                showColorContrast: action.payload,
            };
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        default:
            return state;
    }
};
export const Reducer = (): any =>
    combineReducers<AppState>({
        app: appReducer,
    });
