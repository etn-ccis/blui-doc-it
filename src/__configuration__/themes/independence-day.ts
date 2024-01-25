import * as BLUIThemes from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import IndependenceDay from '../../app/assets/themes/independence-day/independence-day-bg.png';
import IndependenceDayCursor from '../../app/assets/themes/independence-day/flag-cursor.png';
import AppBarTile from '../../app/assets/themes/independence-day/independence-day-appbar-tile.png';
import { Schedule } from './_types';

export const IndependenceDaySchedule: Schedule = {
    start: new Date(0, 6, 1), // July 1
    end: new Date(0, 6, 8), // July 7
    config: {
        theme: {
            ...BLUIThemes.blue,
            palette: {
                ...BLUIThemes.blue.palette,
                mode: 'light',
                primary: {
                    light: BrandingColors.blue[300],
                    main: BrandingColors.blue[500],
                    dark: BrandingColors.blue[700],
                },
                secondary: {
                    light: Colors.red[300],
                    main: Colors.red[500],
                    dark: Colors.red[900],
                },
            },
            components: {
                ...BLUIThemes.blue.components,
                MuiAppBar: {
                    styleOverrides: {
                        ...BLUIThemes.blue.components?.MuiAppBar?.styleOverrides,
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
                },
                MuiButton: {
                    ...BLUIThemes.blue.components?.MuiButton?.styleOverrides,
                    styleOverrides: {
                        outlined: { textTransform: 'none' },
                        outlinedPrimary: {},
                    },
                },
            },
        },
        drawerActiveBackgroundFade: 0.85,
        landingPageBanner: {
            backgroundImage: `url(${IndependenceDay})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 25%',
            backgroundColor: BrandingColors.blue[700],
            textShadow: `0 0 5px black`,
            cursor: `url("${IndependenceDayCursor}") 0 0, auto`,
        },
        className: 'independence-day',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '600px',
            backgroundPosition: 'left 25%',
        },
        landingPageTagline: 'Happy 4th!',
    },
};
