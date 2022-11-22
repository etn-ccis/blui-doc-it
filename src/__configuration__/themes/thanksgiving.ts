import * as BLUIThemes from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import Thanksgiving from '../../app/assets/themes/thanksgiving/thanksgiving-banner.jpg';
import turkeyCursor from '../../app/assets/themes/thanksgiving/turkey-cursor.png';
import AppBarTile from '../../app/assets/themes/thanksgiving/thanksgiving-appbar-tile.png';
import { Schedule } from './_types';

export const ThanksgivingSchedule: Schedule = {
    start: new Date(0, 10, 21), // Nov 21
    end: new Date(0, 10, 28), // Nov 27
    config: {
        theme: {
            ...BLUIThemes.blue,
            palette: {
                ...BLUIThemes.blue.palette,
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
                ...BLUIThemes.blue.components,
                MuiAppBar: {
                    styleOverrides: {
                        ...BLUIThemes.blue.components?.MuiAppBar?.styleOverrides,
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
                        ...BLUIThemes.blue.components?.MuiButton?.styleOverrides,
                        outlined: {},
                        outlinedPrimary: {},
                    },
                },
                MuiFab: {},
            },
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
