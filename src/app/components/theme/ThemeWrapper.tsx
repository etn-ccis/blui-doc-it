import { createTheme, ThemeProvider, ThemeProviderProps } from '@mui/material/styles';
import React from 'react';
import { getScheduledSiteConfig } from '../../../__configuration__/themes';
import { useAppSelector, RootState } from '../../redux';

export const ThemeWrapper: React.FC<Omit<ThemeProviderProps, 'theme'>> = (props) => {
    const selectedTheme = useAppSelector((state: RootState) => state.app.theme);
    return <ThemeProvider {...props} theme={createTheme(getScheduledSiteConfig(selectedTheme).theme)} />;
};
