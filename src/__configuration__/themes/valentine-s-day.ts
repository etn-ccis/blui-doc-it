import * as BLUIThemes from '@brightlayer-ui/react-themes';
import Left from '../../app/assets/themes/valentine-s-day/left.svg';
import Right from '../../app/assets/themes/valentine-s-day/right.svg';
import HelperText from '../../app/assets/themes/valentine-s-day/helper-text.svg';
import Together from '../../app/assets/themes/valentine-s-day/together.svg';
import AppbarTile from '../../app/assets/themes/valentine-s-day/appbar-tile.svg';
import Cursor from '../../app/assets/themes/valentine-s-day/cursor.svg';
import Cursor2 from '../../app/assets/themes/valentine-s-day/cursor-2.svg';
import * as Colors from '@brightlayer-ui/colors';
import { Schedule } from './_types';

export const ValentineSchedule: Schedule = {
    start: new Date(0, 1, 12), // Feb 12
    end: new Date(0, 1, 15), // Feb 14
    config: {
        theme: {
            ...BLUIThemes.blue,
            palette: {
                ...BLUIThemes.blue.palette,
                primary: {
                    light: '#FCB3C8',
                    main: '#EF5482',
                    dark: '#DF3266',
                },
            },
            components: {
                ...BLUIThemes.blue.components,
                MuiAppBar: {
                    styleOverrides: {
                        ...BLUIThemes.blue.components?.MuiAppBar?.styleOverrides,
                        colorSecondary: {
                            color: Colors.white[50],
                            backgroundColor: '#DF3266',
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
            background: `no-repeat 0 center url("${Left}"), no-repeat 100% center url("${Right}"), no-repeat center 100% url("${HelperText}"), #000`,
            color: 'white',
            cursor: `url("${Cursor2}"), auto`,
        },
        landingPageBannerMobile: {
            background: `no-repeat center url("${Together}")`,
            backgroundSize: 'cover',
            color: 'black',
            cursor: `url("${Cursor}"), auto`,
        },
        logoColor: `#EF5482`,
        appBarBackground: {
            background: `repeat-x center linear-gradient(90deg, #DF3266, #EF548200), url("${AppbarTile}"), #EF5482`,
            backgroundSize: 'contain',
        },
        className: 'valentine',
        landingPageTagline: 'We love you ❤️',
    },
};
