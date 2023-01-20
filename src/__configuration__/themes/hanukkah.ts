import * as BLUIThemes from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import Hanukkah from '../../app/assets/themes/hanukkah/hanukkah-banner.png';
import dreidelCursor from '../../app/assets/themes/hanukkah/dreidel-cursor.png';
import AppBarTile from '../../app/assets/themes/hanukkah/hanukkah-appbar-tile.png';
import { Schedule } from './_types';

export const HanukkahSchedule: Schedule = {
    start: new Date(0, 11, 7), // Dec 7
    end: new Date(0, 11, 16), // Dec 15
    config: {
        theme: {
            ...BLUIThemes.blue,
            palette: {
                ...BLUIThemes.blue.palette,
                mode: 'light',
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
                    styleOverrides: {
                        ...BLUIThemes.blue.components?.MuiButton?.styleOverrides,
                        outlined: {},
                        outlinedPrimary: {},
                    },
                },
            },
        },
        landingPageBanner: {
            backgroundImage: `url(${Hanukkah})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 88%',
            backgroundColor: BrandingColors.blue[900],
            cursor: `url("${dreidelCursor}") 0 0, auto`,
            color: Colors.white[50],
        },
        className: 'hanukkah',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '300px',
            backgroundPosition: 'left 75%',
        },
        landingPageTagline: 'Hanukkah Sameach!', // "Happy Hanukkah"
    },
};
