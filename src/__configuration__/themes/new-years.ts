import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import NewYears from '../../app/assets/themes/new-years/new-years-banner.png';
import fireworkCursor from '../../app/assets/themes/new-years/firework-rocket-cursor.png';
import AppBarTile from '../../app/assets/themes/new-years/new-years-appbar-tile.png';
import { Schedule } from './types';

export const NewYearsSchedule: Schedule = {
    start: new Date(0, 11, 31), // Dec 31
    end: new Date(1, 0, 2), // Jan 2
    config: {
        theme: {
            ...PXBThemes.blueDark,
            palette: {
                ...PXBThemes.blueDark.palette,
                type: 'dark',
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
                    hint: Colors.black[200],
                },
            },
            overrides: {
                ...PXBThemes.blueDark.overrides,
                MuiAppBar: {
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
                MuiBackdrop: {
                    root: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                },
                MuiButton: {
                    ...PXBThemes.blueDark.overrides?.MuiButton,
                    outlined: {},
                    outlinedPrimary: {},
                },
                MuiDrawer: {
                    paper: {
                        backgroundColor: Colors.darkBlack[100],
                    },
                },
                MuiTabs: {
                    indicator: {
                        backgroundColor: Colors.yellow[500],
                    },
                },
                MuiTab: {
                    selected: {},
                    textColorInherit: {
                        '&$selected': {
                            color: Colors.yellow[500],
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
