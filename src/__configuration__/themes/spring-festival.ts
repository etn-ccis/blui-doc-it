import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import banner from '../../app/assets/themes/spring-festival/banner.svg';
import cursor from '../../app/assets/themes/spring-festival/cursor.png';
import titleBlock from '../../app/assets/themes/spring-festival/title-block.svg';
import AppBarTile from '../../app/assets/themes/spring-festival/tile.svg';
import { Schedule } from './types';

export const SpringFestivalSchedule: Schedule = {
    start: new Date(0, 1, 11), // Feb 11
    end: new Date(0, 1, 19), // Feb 18
    config: {
        theme: {
            ...PXBThemes.blue,
            palette: {
                ...PXBThemes.blue.palette,
                type: 'light',
                primary: {
                    light: Colors.red[100],
                    main: Colors.red[500],
                    dark: Colors.red[900],
                },
                secondary: {
                    main: Colors.yellow[500],
                },
            },
            overrides: {
                ...PXBThemes.blue.overrides,
                MuiAppBar: {
                    ...PXBThemes.blue.overrides?.MuiAppBar,
                    root: {
                        color: Colors.white[50],
                        '& .MuiInputBase-root': {
                            color: Colors.white[50],
                        },
                        '& .MuiSelect-icon': {
                            color: Colors.white[50],
                        },
                    },
                    colorPrimary: {
                        backgroundColor: Colors.red[900],
                    },
                    colorSecondary: {
                        backgroundColor: Colors.red[800],
                        color: Colors.white[50],
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
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundColor: Colors.red[800],
            cursor: `url("${cursor}") 16 0, auto`,
            color: Colors.white[50],
        },
        className: 'spring-festival',
        customBannerText: {
            backgroundImage: `url(${titleBlock})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        drawerActiveBackgroundFade: 0.9,
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
        },
    },
};
