import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorType, RoadmapBucket, Release } from '../../../__types__';

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
    roadmapCache: Record<Release, RoadmapBucket[]>;
    roadmapLoading: Record<Release, boolean>;
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
    roadmapCache: {} as Record<Release, RoadmapBucket[]>,
    roadmapLoading: {} as Record<Release, boolean>,
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
        setRoadmapLoading: (state, action: PayloadAction<{ release: Release; loading: boolean }>) => {
            state.roadmapLoading[action.payload.release] = action.payload.loading;
        },
        setRoadmapData: (state, action: PayloadAction<{ release: Release; data: RoadmapBucket[] }>) => {
            state.roadmapCache[action.payload.release] = action.payload.data;
            state.roadmapLoading[action.payload.release] = false;
        },
        clearRoadmapCache: (state) => {
            state.roadmapCache = {} as Record<Release, RoadmapBucket[]>;
            state.roadmapLoading = {} as Record<Release, boolean>;
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
    setRoadmapLoading,
    setRoadmapData,
    clearRoadmapCache,
} = appSlice.actions;

export default appSlice.reducer;
