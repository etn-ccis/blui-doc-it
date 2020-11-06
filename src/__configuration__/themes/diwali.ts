import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import * as BrandingColors from '@pxblue/colors-branding';
import Diwali from '../../app/assets/themes/diwali3.jpg';
import AppBarTile from '../../app/assets/themes/christmas-appbar-tile.png';
import { Schedule } from './types';

export const DiwaliSchedule: Schedule = {
    start: new Date(0, 10, 5), // Nov 12
    end: new Date(0, 10, 16), // Nov 16
    config: {
        theme: {
            ...PXBThemes.blueDark,
            palette: {
                ...PXBThemes.blueDark.palette,
                primary: {
                    light: BrandingColors.wine[300],
                    main: BrandingColors.wine[400],
                    dark: BrandingColors.wine[900],
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
                    hint: Colors.black[200],
                },
            },
            overrides: {
                ...PXBThemes.blueDark.overrides,
                MuiAppBar: {
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
                        backgroundColor: Colors.darkBlack[300],
                    },
                },
                MuiTabs: {
                    indicator: {
                        backgroundColor: Colors.orange[500],
                    },
                },
                MuiTab: {
                    selected: {},
                    textColorInherit: {
                        '&$selected': {
                            color: Colors.orange[500],
                        },
                    },
                },
            },
        },
        landingPageBanner: {
            backgroundImage: `url(${Diwali})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 65%',
            backgroundColor: BrandingColors.navy[900],
        },
        className: 'christmas-eve',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
        },
    },
};
