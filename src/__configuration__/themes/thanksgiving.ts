import * as BluiThemes from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import Thanksgiving from '../../app/assets/themes/thanksgiving/thanksgiving-banner.jpg';
import turkeyCursor from '../../app/assets/themes/thanksgiving/turkey-cursor.png';
import AppBarTile from '../../app/assets/themes/thanksgiving/thanksgiving-appbar-tile.png';
import { Schedule } from './types';

export const ThanksgivingSchedule: Schedule = {
    start: new Date(0, 10, 21), // Nov 21
    end: new Date(0, 10, 28), // Nov 27
    config: {
        theme: {
            ...BluiThemes.blue,
            palette: {
                ...BluiThemes.blue.palette,
                type: 'light',
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
            overrides: {
                ...BluiThemes.blue.overrides,
                MuiAppBar: {
                    ...BluiThemes.blue.overrides?.MuiAppBar,
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
                MuiButton: {
                    ...BluiThemes.blue.overrides?.MuiButton,
                    outlined: {},
                    outlinedPrimary: {},
                },
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
