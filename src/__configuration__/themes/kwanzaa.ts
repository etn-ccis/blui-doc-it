import { blueThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
// import Kwanzaa from '../../app/assets/themes/kwanzaa/kwanzaa-banner.png';
import Kwanzaa from '../../app/assets/themes/kwanzaa/kwanzaa-banner.png';
import flagCursor from '../../app/assets/themes/kwanzaa/flag-cursor.png';
import AppBarTile from '../../app/assets/themes/kwanzaa/kwanzaa-appbar-tile.png';
import { Schedule } from './_types';

export const KwanzaaSchedule: Schedule = {
    start: new Date(0, 11, 29), // Dec 29
    end: new Date(0, 11, 31), // Dec 30 - festival should run until Jan 1, but we cut this off on early to account for New Years theme
    config: {
        theme: {
            palette: {
                ...blueThemes.palette,
                mode: 'light',
                primary: {
                    light: Colors.red[100],
                    main: Colors.red[500],
                    dark: Colors.red[900],
                },
                secondary: {
                    light: BrandingColors.emerald[300],
                    main: BrandingColors.emerald[500],
                    dark: BrandingColors.emerald[900],
                },
            },
            components: {
                MuiAppBar: {
                    styleOverrides: {
                        colorSecondary: {
                            color: Colors.white[50],
                            backgroundColor: Colors.red[900],
                            '& .MuiInputBase-root': {
                                color: Colors.white[50],
                            },
                            '& .MuiSelect-icon': {
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
            },
            typography: blueThemes.typography,
        },
        landingPageBanner: {
            backgroundImage: `url(${Kwanzaa})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 96%',
            backgroundColor: Colors.red[900],
            cursor: `url("${flagCursor}") 0 0, auto`,
            color: Colors.white[50],
        },
        className: 'kwanzaa',
        drawerActiveBackgroundFade: 0.9,
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '300px',
            backgroundPosition: 'left 75%',
        },
    },
};
