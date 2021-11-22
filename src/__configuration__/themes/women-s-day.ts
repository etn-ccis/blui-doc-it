import * as BLUIThemes from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import Banner from '../../app/assets/themes/women-s-day/international-women-s-day-banner.svg';
import AppBarTile from '../../app/assets/themes/women-s-day/international-women-s-day-appbar-tile.svg';
import Cursor from '../../app/assets/themes/women-s-day/women-s-day-cursor.png';
import { Schedule } from './types';

// Custom palette since we don't have pink colors
const LIGHT_COLOR = '#F1C4DA';
const MAIN_COLOR = '#DE237D';
const DARK_COLOR = '#B41461';

export const WomenSDaySchedule: Schedule = {
    start: new Date(0, 2, 7), // Mar 7
    end: new Date(0, 2, 10), // Mar 9
    config: {
        theme: {
            ...BLUIThemes.blue,
            palette: {
                ...BLUIThemes.blue.palette,
                primary: {
                    light: LIGHT_COLOR,
                    main: MAIN_COLOR,
                    dark: DARK_COLOR,
                },
                secondary: {
                    main: Colors.lightBlue[300],
                },
            },
            overrides: {
                ...BLUIThemes.blue.overrides,
                MuiAppBar: {
                    ...BLUIThemes.blue.overrides?.MuiAppBar,
                    colorDefault: {
                        backgroundColor: MAIN_COLOR,
                    },
                    colorPrimary: {
                        backgroundColor: MAIN_COLOR,
                    },
                    colorSecondary: {
                        color: Colors.white[50],
                        backgroundColor: DARK_COLOR,
                        '& .MuiInputBase-input, & .MuiSelect-icon': {
                            color: Colors.white[50],
                        },
                    },
                },
                MuiButton: {
                    ...BLUIThemes.blue.overrides?.MuiButton,
                    outlined: {},
                    outlinedPrimary: {},
                },
                MuiTabs: {
                    indicator: {
                        backgroundColor: Colors.white[50],
                    },
                },
                MuiTab: {
                    selected: {},
                    textColorInherit: {
                        color: Colors.white[50],
                        '&$selected': {
                            color: Colors.white[50],
                        },
                    },
                },
            },
        },
        landingPageBanner: {
            backgroundImage: `url(${Banner})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            textShadow: `0 0 5px black`,
            cursor: `url("${Cursor}"), auto`,
        },
        drawerActiveBackgroundFade: 0.9,
        className: 'christmas-eve',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
        },
        landingPageTagline: 'We can do it',
    },
};
