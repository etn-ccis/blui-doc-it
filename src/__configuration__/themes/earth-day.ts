import { blueThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import banner from '../../app/assets/themes/earth-day/earth.jpg';
import cursor from '../../app/assets/themes/earth-day/cursor.svg';
import AppBarTile from '../../app/assets/themes/earth-day/tile.svg';
import { Schedule } from './_types';

export const EarthDaySchedule: Schedule = {
    start: new Date(0, 3, 20), // Apr 20
    end: new Date(0, 3, 25), // Apr 24
    config: {
        theme: {
            palette: {
                ...blueThemes.palette,
                secondary: {
                    main: Colors.green[500],
                },
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        outlined: {
                            borderColor: Colors.white[50],
                            textTransform: 'none',
                        },
                    },
                },
            },
            typography: blueThemes.typography,
        },
        // @ts-ignore
        landingPageBanner: {
            background: `linear-gradient(transparent 75%, #000d), url(${banner}) center 53% / cover no-repeat`,
            cursor: `url("${cursor}"), auto`,
            color: Colors.white[50],
        },
        className: 'earth-day',
        appBarBackground: {
            background: `url(${AppBarTile}), linear-gradient(90deg, ${Colors.green[900]}, ${Colors.blue[700]})`,
            backgroundPosition: 'center',
        },
    },
};
