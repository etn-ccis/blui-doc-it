// import * as BLUIThemes from '@brightlayer-ui/react-themes';
import { theme } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import NewYears from '../../app/assets/themes/new-years/new-years-banner.png';
import fireworkCursor from '../../app/assets/themes/new-years/firework-rocket-cursor.png';
import AppBarTile from '../../app/assets/themes/new-years/new-years-appbar-tile.png';
import { Schedule } from './_types';

export const NewYearsSchedule: Schedule = {
    start: new Date(0, 11, 31), // Dec 31
    end: new Date(1, 0, 7), // Jan 6 (Next Year)
    config: {
        theme: {
            ...theme,
            palette: {
                ...theme.palette,
                mode: 'dark',
                primary: {
                    light: Colors.yellow[300],
                    main: Colors.yellow[500],
                    dark: Colors.yellow[900],
                },
                secondary: {
                    light: Colors.lightBlue[300],
                    main: Colors.lightBlue[500],
                    dark: Colors.lightBlue[900],
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
            components: {
                ...theme.components,
                MuiAppBar: {
                    styleOverrides: {
                        colorDefault: {
                            color: Colors.black[50],
                            backgroundColor: Colors.darkBlack[200],
                        },
                        colorPrimary: {
                            color: Colors.black[50],
                            backgroundColor: Colors.darkBlack[200],
                        },
                        colorSecondary: {
                            color: Colors.white[200],
                            backgroundColor: Colors.darkBlack[400],
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
                    ...theme.components?.MuiButton?.styleOverrides,
                    styleOverrides: {
                        outlined: { textTransform: 'none' },
                        outlinedPrimary: {},
                    },
                },
                MuiFab: {},
                MuiSwitch: {},
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            '&.MuiInputBase-colorPrimary.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: Colors.yellow[500],
                            },
                            '&.MuiInputBase-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: Colors.lightBlue[500],
                            },
                        },
                    },
                },
                MuiDrawer: {
                    styleOverrides: {
                        paper: {
                            backgroundColor: Colors.darkBlack[100],
                        },
                    },
                },
                MuiTabs: {
                    styleOverrides: {
                        indicator: {
                            backgroundColor: Colors.yellow[500],
                        },
                    },
                },
                MuiTab: {
                    styleOverrides: {
                        selected: {},
                        textColorInherit: {
                            '&.Mui-selected': {
                                color: Colors.yellow[500],
                            },
                        },
                    },
                },
            },
        },
        landingPageBanner: {
            backgroundImage: `url(${NewYears})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 33%',
            backgroundColor: Colors.black[900],
            cursor: `url("${fireworkCursor}") 0 0, auto`,
            color: Colors.white[50],
            textShadow: `0 0 5px black`,
        },
        logoColor: Colors.white[50],
        className: 'new-years',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '300px',
            backgroundPosition: 'left 75%',
        },
        landingPageTagline: 'Happy New Year!',
    },
};
