import { blueThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import Banner from '../../app/assets/themes/women-s-day/international-women-s-day-banner.svg';
import AppBarTile from '../../app/assets/themes/women-s-day/international-women-s-day-appbar-tile.svg';
import Cursor from '../../app/assets/themes/women-s-day/women-s-day-cursor.png';
import { Schedule } from './_types';

// Custom palette since we don't have pink colors
const LIGHT_COLOR = '#F1C4DA';
const MAIN_COLOR = '#DE237D';
const DARK_COLOR = '#B41461';

export const WomenSDaySchedule: Schedule = {
    start: new Date(0, 2, 7), // Mar 7
    end: new Date(0, 2, 10), // Mar 9
    config: {
        theme: {
            palette: {
                ...blueThemes.palette,
                mode: 'light',
                primary: {
                    light: LIGHT_COLOR,
                    main: MAIN_COLOR,
                    dark: DARK_COLOR,
                },
                secondary: {
                    main: Colors.lightBlue[300],
                },
            },
            components: {
                MuiAppBar: {
                    styleOverrides: {
                        colorDefault: {
                            backgroundColor: MAIN_COLOR,
                        },
                        colorPrimary: {
                            backgroundColor: MAIN_COLOR,
                        },
                        colorSecondary: {
                            color: Colors.white[50],
                            backgroundColor: DARK_COLOR,
                            '& .MuiInputBase-input, & .MuiSelect-icon': {
                                color: Colors.white[50],
                            },
                        },
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        outlined: { textTransform: 'none' },
                        outlinedPrimary: {},
                    },
                },
                MuiFab: {},
                MuiSwitch: {},
                MuiTabs: {
                    styleOverrides: {
                        indicator: {
                            backgroundColor: Colors.white[50],
                        },
                    },
                },
                MuiTab: {
                    styleOverrides: {
                        selected: {},
                        textColorInherit: {
                            color: Colors.white[50],
                            '&.Mui-selected': {
                                color: Colors.white[50],
                            },
                        },
                    },
                },
            },
            typography: blueThemes.typography,
        },
        landingPageBanner: {
            backgroundImage: `url(${Banner})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            textShadow: `0 0 5px black`,
            cursor: `url("${Cursor}"), auto`,
        },
        drawerActiveBackgroundFade: 0.9,
        className: 'women-s-day',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
        },
        landingPageTagline: 'We can do it',
    },
};
