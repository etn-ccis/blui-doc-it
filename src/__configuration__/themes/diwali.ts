import * as BLUIThemes from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import Diwali from '../../app/assets/themes/diwali/diwali-banner.jpg';
import diwaliCursor from '../../app/assets/themes/diwali/diwali-cursor.png';
import AppBarTile from '../../app/assets/themes/diwali/diwali-appbar-tile.png';
import { Schedule } from './_types';

export const DiwaliSchedule: Schedule = {
    start: new Date(0, 9, 24), // Oct 24
    end: new Date(0, 9, 28), // Oct 28
    config: {
        theme: {
            ...BLUIThemes.blue,
            palette: {
                ...BLUIThemes.blue.palette,
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
                ...BLUIThemes.blue.overrides,
                MuiAppBar: {
                    ...BLUIThemes.blue.overrides?.MuiAppBar,
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
                    ...BLUIThemes.blue.overrides?.MuiButton,
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
