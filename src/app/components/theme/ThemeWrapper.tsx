import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeProviderProps } from '@mui/styles';
import React from 'react';
import { getScheduledSiteConfig } from '../../../__configuration__/themes';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';

export const ThemeWrapper: React.FC<Omit<ThemeProviderProps, 'theme'>> = (props) => {
    const selectedTheme = useSelector((state: AppState) => state.app.theme);
    return <ThemeProvider {...props} theme={createTheme(getScheduledSiteConfig(selectedTheme).theme)} />;
};
