import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorType } from '../../../__types__';

export type AppState = {
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

const initialState: AppState = {
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

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changePageTitle: (state, action: PayloadAction<string>) => {
            state.pageTitle = action.payload;
        },
        changeColorFormat: (state, action: PayloadAction<'rgb' | 'hex'>) => {
            state.colorFormat = action.payload;
        },
        toggleDrawer: (state, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
        toggleSearch: (state, action: PayloadAction<boolean>) => {
            state.searchActive = action.payload;
        },
        toggleSidebar: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        toggleTOC: (state, action: PayloadAction<boolean>) => {
            state.hasTOC = action.payload;
        },
        showBanner: (state, action: PayloadAction<boolean>) => {
            state.showBanner = action.payload;
        },
        hideBanner: (state) => {
            state.showBanner = false;
        },
        changeSelectedColor: (state, action: PayloadAction<ColorType | undefined>) => {
            state.selectedColor = action.payload;
        },
        toggleColorContrast: (state, action: PayloadAction<boolean>) => {
            state.showColorContrast = action.payload;
        },
        changeTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
    },
});

export const {
    changePageTitle,
    changeColorFormat,
    toggleDrawer,
    toggleSearch,
    toggleSidebar,
    toggleTOC,
    showBanner,
    hideBanner,
    changeSelectedColor,
    toggleColorContrast,
    changeTheme,
} = appSlice.actions;

export default appSlice.reducer;
