import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import * as BrandingColors from '@pxblue/colors-branding';
import Diwali from '../../app/assets/themes/diwali/diwali-banner.jpg';
import diwaliCursor from '../../app/assets/themes/diwali/diwali-cursor.png';
import AppBarTile from '../../app/assets/themes/diwali/diwali-appbar-tile.png';
import { Schedule } from './types';

export const DiwaliSchedule: Schedule = {
    start: new Date(0, 10, 11), // Nov 11
    end: new Date(0, 10, 17), // Nov 17
    config: {
        theme: {
            ...PXBThemes.blue,
            palette: {
                ...PXBThemes.blue.palette,
                type: 'light',
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
            },
            overrides: {
                ...PXBThemes.blue.overrides,
                MuiAppBar: {
                    ...PXBThemes.blue.overrides?.MuiAppBar,
                    colorSecondary: {
                        color: Colors.white[50],
                        backgroundColor: BrandingColors.wine[500],
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
        drawerActiveBackgroundFade: 0.85,
        landingPageBanner: {
            backgroundImage: `url(${Diwali})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 65%',
            backgroundColor: BrandingColors.wine[900],
            cursor: `url("${diwaliCursor}") 0 25, auto`,
            textShadow: `0 0 4px black`,
        },
        className: 'diwali',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '300px',
            backgroundPosition: 'left 75%',
        },
    },
};
