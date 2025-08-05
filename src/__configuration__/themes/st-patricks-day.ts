// import * as BLUIThemes from '@brightlayer-ui/react-themes';
import { theme } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import StPatricksDay from '../../app/assets/themes/st-patricks-day/st-patricks-day-banner.png';
import stPatricksDayCursor from '../../app/assets/themes/st-patricks-day/st-patricks-day-cursor.png';
import AppBarTile from '../../app/assets/themes/st-patricks-day/st-patricks-day-appbar-tile.png';
import { Schedule } from './_types';

export const StPatricksDaySchedule: Schedule = {
    start: new Date(0, 2, 16), // Mar 16
    end: new Date(0, 2, 19), // Mar 18
    config: {
        theme: {
            ...theme,
            palette: {
                ...theme.palette,
                mode: 'light',
                primary: {
                    light: Colors.green[300],
                    main: Colors.green[700],
                    dark: Colors.green[900],
                },
                secondary: {
                    light: Colors.gold[300],
                    main: Colors.gold[500],
                    dark: Colors.gold[900],
                },
            },
            components: {
                ...theme.components,
                MuiAppBar: {
                    styleOverrides: {
                        ...theme.components?.MuiAppBar?.styleOverrides,
                        colorSecondary: {
                            color: Colors.white[50],
                            backgroundColor: Colors.green[700],
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
                    ...theme.components?.MuiButton?.styleOverrides,
                    styleOverrides: {
                        outlined: { textTransform: 'none' },
                        outlinedPrimary: {},
                    },
                },
                MuiFab: {},
                MuiSwitch: {},
            },
        },
        drawerActiveBackgroundFade: 0.85,
        landingPageBanner: {
            backgroundImage: `url(${StPatricksDay})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 65%',
            backgroundColor: Colors.green[900],
            cursor: `url("${stPatricksDayCursor}") 5 5, auto`,
        },
        className: 'st-patricks-day',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundSize: '300px',
            backgroundPosition: 'left 75%',
        },
        landingPageTagline: "Top o' the mornin' to ya!",
    },
};
