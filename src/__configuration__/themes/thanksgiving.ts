import { blueThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import Thanksgiving from '../../app/assets/themes/thanksgiving/thanksgiving-banner.jpg';
import turkeyCursor from '../../app/assets/themes/thanksgiving/turkey-cursor.png';
import AppBarTile from '../../app/assets/themes/thanksgiving/thanksgiving-appbar-tile.png';
import { Schedule } from './_types';

export const ThanksgivingSchedule: Schedule = {
    start: new Date(0, 10, 22), // Nov 22
    end: new Date(0, 10, 30), // Nov 29
    config: {
        theme: {
            palette: {
                ...blueThemes.palette,
                mode: 'light',
                primary: {
                    light: BrandingColors.rust[100],
                    main: BrandingColors.rust[500],
                    dark: BrandingColors.rust[900],
                },
                secondary: {
                    light: BrandingColors.goldenrod[300],
                    main: BrandingColors.goldenrod[500],
                    dark: BrandingColors.goldenrod[900],
                },
            },
            components: {
                MuiAppBar: {
                    styleOverrides: {
                        colorSecondary: {
                            color: Colors.white[50],
                            backgroundColor: BrandingColors.rust[500],
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
            backgroundImage: `url(${Thanksgiving})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 88%',
            backgroundColor: BrandingColors.rust[900],
            cursor: `url("${turkeyCursor}") 0 25, auto`,
            color: BrandingColors.rust[500],
        },
        logoColor: BrandingColors.rust[500],
        className: 'thanksgiving',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '300px',
            backgroundPosition: 'left 75%',
        },
        landingPageTagline: 'gobble till you wobble',
    },
};
