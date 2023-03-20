import * as BLUIThemes from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import banner from '../../app/assets/themes/mid-autumn-festival/banner.svg';
import cursor from '../../app/assets/themes/mid-autumn-festival/cursor.png';
import titleBlock from '../../app/assets/themes/mid-autumn-festival/title-block.png';
import AppBarTile from '../../app/assets/themes/mid-autumn-festival/app-bar.png';
import { Schedule } from './_types';

export const MidAutumnSchedule: Schedule = {
    start: new Date(0, 8, 29), // Sept 29
    end: new Date(0, 9, 7), // Oct 6
    config: {
        theme: {
            ...BLUIThemes.blueDark,
            palette: {
                ...BLUIThemes.blueDark.palette,
                mode: 'dark',
                primary: {
                    light: Colors.yellow[200],
                    main: Colors.yellow[400],
                    dark: Colors.yellow[700],
                },
                secondary: {
                    main: Colors.red[500],
                },
            },
            components: {
                ...BLUIThemes.blueDark.components,
                MuiAppBar: {
                    styleOverrides: {
                        ...BLUIThemes.blueDark.components?.MuiAppBar?.styleOverrides,
                        colorPrimary: {
                            backgroundColor: BrandingColors.butter[500],
                            color: Colors.black[700],
                        },
                        colorSecondary: {
                            backgroundColor: BrandingColors.butter[700],
                            color: Colors.black[700],
                            '& .MuiInputBase-root': {
                                color: Colors.black[700],
                            },
                            '& .MuiSelect-icon': {
                                color: Colors.black[700],
                            },
                        },
                    },
                },
                MuiButton: {
                    ...BLUIThemes.blue.components?.MuiButton?.styleOverrides,
                    styleOverrides: {
                        outlined: { textTransform: 'none' },
                        outlinedPrimary: {},
                    },
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            '&.MuiInputBase-colorPrimary.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: Colors.yellow[400],
                            },
                            '&.MuiInputBase-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: Colors.red[500],
                            },
                        },
                    },
                },
                MuiTabs: {
                    styleOverrides: {
                        indicator: {
                            backgroundColor: Colors.red[500],
                        },
                    },
                },
                MuiTab: {
                    styleOverrides: {
                        selected: {},
                        textColorPrimary: {
                            color: Colors.black[700],
                            '&.Mui-selected': {
                                color: Colors.red[500],
                            },
                        },
                        textColorInherit: {
                            '&.Mui-selected': {
                                color: Colors.red[500],
                            },
                        },
                    },
                },
                MuiFab: {
                    styleOverrides: {
                        primary: {
                            backgroundColor: Colors.red[700],
                            color: 'white',
                        },
                    },
                },
            },
        },
        landingPageBanner: {
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundColor: BrandingColors.butter[900],
            cursor: `url("${cursor}"), auto`,
            color: Colors.black[700],
            padding: '32px 32px',
        },
        className: 'mid-autumn-festival',
        customBannerText: {
            backgroundImage: `url(${titleBlock})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '40vh',
            width: 600,
        },
        appBarBackground: {
            backgroundImage: `url(${AppBarTile})`,
            backgroundPosition: 'center',
            textShadow: '0 0 2px white',
        },
    },
};
