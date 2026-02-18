import { blueThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import banner from '../../app/assets/themes/spring-festival/banner.svg';
import cursor from '../../app/assets/themes/spring-festival/cursor.png';
import titleBlock from '../../app/assets/themes/spring-festival/title-block.svg';
import AppBarTile from '../../app/assets/themes/spring-festival/tile.svg';
import { Schedule } from './_types';

export const SpringFestivalSchedule: Schedule = {
    start: new Date(0, 2, 17), // Feb 17
    end: new Date(0, 3, 4), // Mar 3
    config: {
        theme: {
            palette: {
                ...blueThemes.palette,
                mode: 'light',
                primary: {
                    light: Colors.red[100],
                    main: Colors.red[500],
                    dark: Colors.red[900],
                },
                secondary: {
                    main: Colors.yellow[500],
                },
            },
            components: {
                MuiAppBar: {
                    styleOverrides: {
                        colorPrimary: {
                            backgroundColor: Colors.red[900],
                            color: Colors.white[50],
                        },
                        colorSecondary: {
                            backgroundColor: Colors.red[800],
                            color: Colors.white[50],
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
                        outlined: { textTransform: 'none' },
                        outlinedPrimary: {},
                    },
                },
                MuiSwitch: {},
                MuiFab: {
                    styleOverrides: {
                        primary: {
                            backgroundColor: Colors.yellow[900],
                        },
                    },
                },
            },
            typography: blueThemes.typography,
        },
        landingPageBanner: {
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundColor: Colors.red[800],
            cursor: `url("${cursor}") 12 0, auto`,
            color: Colors.white[50],
        },
        className: 'spring-festival',
        customBannerText: {
            backgroundImage: `url(${titleBlock})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 600,
        },
        drawerActiveBackgroundFade: 0.9,
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
        },
    },
};
