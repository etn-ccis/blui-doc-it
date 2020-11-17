import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import * as BrandingColors from '@pxblue/colors-branding';
import ChristmasEve from '../../app/assets/themes/christmas-eve.png';
import AppBarTile from '../../app/assets/themes/christmas-appbar-tile.png';
import { Schedule } from './types';

export const ChristmasSchedule: Schedule = {
    start: new Date(0, 11, 23), // Dec 23
    end: new Date(0, 11, 26), // Dec 26
    config: {
        theme: {
            ...PXBThemes.blue,
            overrides: {
                ...PXBThemes.blue.overrides,
                MuiAppBar: {
                    ...PXBThemes.blue.overrides?.MuiAppBar,
                    root: {
                        borderBottom: `1px solid ${Colors.black[50]}`,
                    },
                    colorDefault: {
                        color: Colors.black[500],
                        backgroundColor: Colors.white[50],
                    },
                    colorPrimary: {
                        color: Colors.black[500],
                        backgroundColor: Colors.white[50],
                    },
                    colorSecondary: {
                        color: Colors.blue[500],
                        backgroundColor: Colors.white[50],
                    },
                },
                MuiTabs: {
                    indicator: {
                        backgroundColor: Colors.blue[500],
                    },
                },
                MuiTab: {
                    selected: {},
                    textColorInherit: {
                        color: Colors.black[500],
                        '&$selected': {
                            color: Colors.blue[500],
                        },
                    },
                },
            },
        },
        landingPageBanner: {
            backgroundImage: `url(${ChristmasEve})`,
            backgroundSize: 700,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center -23px',
            backgroundColor: BrandingColors.navy[900],
        },
        className: 'christmas-eve',
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
        },
    },
};
