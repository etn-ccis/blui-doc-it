import * as PXBThemes from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import banner from '../../app/assets/themes/earth-day/earth.jpg';
import cursor from '../../app/assets/themes/earth-day/cursor.svg';
import titleBlock from '../../app/assets/themes/earth-day/title-block.gif';
import AppBarTile from '../../app/assets/themes/earth-day/tile.svg';
import { Schedule } from './types';

export const EarthDaySchedule: Schedule = {
    start: new Date(0, 3, 20), // Apr 20
    end: new Date(0, 3, 25), // Apr 24
    config: {
        theme: {
            ...PXBThemes.blue,
            palette: {
                ...PXBThemes.blue.palette,
                secondary: {
                    main: Colors.green[500],
                },
            },
        },
        // @ts-ignore
        landingPageBanner: {
            background: `linear-gradient(transparent 75%, #000d), url(${banner}) center 53% / cover no-repeat`,
            cursor: `url("${cursor}"), auto`,
            color: Colors.white[50],
        },
        className: 'earth-day',
        customBannerText: {
            backgroundImage: `url(${titleBlock})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
        },
    },
};
