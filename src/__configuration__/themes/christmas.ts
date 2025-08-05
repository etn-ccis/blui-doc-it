// import * as BLUIThemes from '@brightlayer-ui/react-themes';
import { theme } from "@brightlayer-ui/react-themes";
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import ChristmasEve from '../../app/assets/themes/christmas/christmas-eve.png';
import AppBarTile from '../../app/assets/themes/christmas/christmas-appbar-tile.png';
import { Schedule } from './_types';

export const ChristmasSchedule: Schedule = {
    start: new Date(0, 11, 19), // Dec 19
    end: new Date(0, 11, 26), // Dec 25
    config: {
        theme: {
            ...theme,
            components: {
                ...theme.components,
                MuiAppBar: {
                    styleOverrides: {
                        ...theme.components?.MuiAppBar?.styleOverrides,
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
                        ...theme.components?.MuiButton?.styleOverrides,
                        outlined: {
                            borderColor: Colors.white[50],
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
        landingPageTagline: 'ho ho ho',
    },
};
