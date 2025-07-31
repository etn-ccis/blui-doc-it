// Redux store
export { store } from './store';
export type { RootState, AppDispatch } from './store';

// Typed hooks
export { useAppDispatch, useAppSelector } from './hooks';

// Actions from slices
export {
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
} from './slices/appSlice';

// Types
export type { AppState } from './slices/appSlice';
