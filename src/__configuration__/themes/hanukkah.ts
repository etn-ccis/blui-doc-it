import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import * as BrandingColors from '@pxblue/colors-branding';
import Hanukkah from '../../app/assets/themes/hanukkah/hanukkah-banner-4.jpg';
import dreidelCursor from '../../app/assets/themes/hanukkah/dreidel-cursor-2.png';
import AppBarTile from '../../app/assets/themes/hanukkah/hanukkah-appbar-tile.png';
import { Schedule } from './types';

export const HanukkahSchedule: Schedule = {
    start: new Date(0, 11, 10), // Dec 10
    end: new Date(0, 11, 18), // Dec 18
    config: {
        theme: {
            ...PXBThemes.blue,
            palette: {
                ...PXBThemes.blue.palette,
                type: 'light',
                primary: {
                    light: BrandingColors.blue[100],
                    main: BrandingColors.blue[500],
                    dark: BrandingColors.blue[900],
                },
                secondary: {
                    light: Colors.gray[300],
                    main: Colors.gray[500],
                    dark: Colors.gray[900],
                },
            },
            overrides: {
                ...PXBThemes.blue.overrides,
                MuiAppBar: {
                    ...PXBThemes.blue.overrides?.MuiAppBar,
                    colorSecondary: {
                        color: Colors.white[50],
                        backgroundColor: BrandingColors.blue[500],
                        '& .MuiInputBase-root': {
                            color: Colors.white[50],
                        },
                        '& .MuiSelect-icon': {
                            color: Colors.white[50],
                        },
                    },
                },
                MuiButton: {
                    ...PXBThemes.blue.overrides?.MuiButton,
                    outlined: {},
                    outlinedPrimary: {},
                },
            },
        },
        landingPageBanner: {
            backgroundImage: `url(${Hanukkah})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 88%',
            backgroundColor: BrandingColors.blue[900],
            cursor: `url("${dreidelCursor}") 0 25, auto`,
            color: Colors.white[50],
        },
        // logoColor: BrandingColors.rust[500],
        className: 'hanukkah',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '300px',
            backgroundPosition: 'left 75%',
        },
        landingPageTagline: 'Hanukkah Sameach!',
    },
};
