import { blueThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import { ThemeOptions } from '@mui/material/styles';

import castles from '../../app/assets/themes/halloween/castles.svg';
import ghosts from '../../app/assets/themes/halloween/halloween-appbar-tile.svg';
import witch from '../../app/assets/themes/halloween/witch.png';
import { Schedule } from './_types';

const HalloweenTheme: ThemeOptions = {
    palette: {
        ...blueThemes.palette,
        mode: 'dark',
        primary: {
            light: Colors.orange[300],
            main: Colors.orange[500],
            dark: Colors.orange[900],
        },
        secondary: {
            light: Colors.gold[300],
            main: Colors.gold[500],
            dark: Colors.gold[900],
        },
        background: {
            default: Colors.darkBlack[100],
            paper: Colors.black[900],
        },
        text: {
            primary: Colors.black[50],
            secondary: Colors.black[200],
            // hint: Colors.black[200],
        },
    },
    typography: blueThemes.typography,
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorDefault: {
                    color: Colors.black[50],
                    backgroundColor: Colors.black[800],
                },
                colorPrimary: {
                    color: Colors.black[50],
                    backgroundColor: Colors.black[800],
                },
                colorSecondary: {
                    color: Colors.white[200],
                    backgroundColor: Colors.black[900],
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                outlined: { textTransform: 'none' },
                outlinedPrimary: {},
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: Colors.darkBlack[300],
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: Colors.orange[500],
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                selected: {},
                textColorInherit: {
                    '&$selected': {
                        color: Colors.orange[500],
                    },
                },
            },
        },
    },
};

export const HalloweenSchedule: Schedule = {
    start: new Date(0, 9, 24), // Oct 24
    end: new Date(0, 10, 1), // Oct 30
    config: {
        theme: HalloweenTheme,
        landingPageBanner: {
            backgroundImage: `url(${castles})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            cursor: `url("${witch}") 0 25, auto`,
            minHeight: 400,
        },
        className: 'halloween',
        appBarBackground: {
            backgroundImage: `url(${ghosts})`,
        },
        landingPageTagline: 'boo',
        drawerActiveBackgroundFade: 0.85, // Add background fade for active drawer items
    },
};
