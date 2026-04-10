import { blueThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import ChristmasEve from '../../app/assets/themes/christmas/christmas-eve.png';
import AppBarTile from '../../app/assets/themes/christmas/christmas-appbar-tile.png';
import { Schedule } from './_types';
import { getHolidayDates } from './holidayScheduleLoader';

const dates = getHolidayDates('christmas');

export const ChristmasSchedule: Schedule = {
    start: dates?.start ?? new Date(0, 11, 19),
    end: dates?.end ?? new Date(0, 11, 25),
    config: {
        theme: {
            palette: {
                ...blueThemes.palette,
                mode: 'light',
                primary: {
                    ...blueThemes.palette.primary,
                },
            },
            components: {
                MuiAppBar: {
                    styleOverrides: {
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
                },
                MuiTabs: {
                    styleOverrides: {
                        indicator: {
                            backgroundColor: Colors.blue[500],
                        },
                    },
                },
                MuiTab: {
                    styleOverrides: {
                        selected: {},
                        textColorInherit: {
                            color: Colors.black[500],
                            '&$selected': {
                                color: Colors.blue[500],
                            },
                        },
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        outlined: {
                            borderColor: Colors.white[50],
                            textTransform: 'none',
                        },
                    },
                },
                MuiPaper: {
                    styleOverrides: {
                        outlined: {
                            borderColor: Colors.gray[900],
                        },
                    },
                },
            },
            typography: blueThemes.typography,
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
        landingPageTagline: 'ho ho ho',
    },
};
