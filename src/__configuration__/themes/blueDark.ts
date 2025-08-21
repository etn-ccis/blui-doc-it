import { blueThemes } from '@brightlayer-ui/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './_types';
import * as Colors from '@brightlayer-ui/colors';

export const blueDarkTheme: SiteConfig = {
    theme: {
        palette: {
            ...blueThemes.palette,
            mode: 'dark',
            primary: {
                light: Colors.blue[100],
                main: Colors.blue[200],
                dark: Colors.blue[300],
            },
            background: {
                default: Colors.darkBlack[300],
                paper: Colors.black[900],
            },
            text: {
                primary: Colors.black[50],
                secondary: Colors.black[200],
                // hint: Colors.black[200],
            },
        },
        typography: blueThemes.typography,
        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorDefault: {
                        color: Colors.black[50],
                        backgroundColor: Colors.black[800],
                    },
                    colorPrimary: {
                        color: Colors.black[50],
                        backgroundColor: Colors.black[800],
                    },
                    colorSecondary: {
                        color: Colors.white[200],
                        backgroundColor: Colors.black[900],
                    },
                },
            },
            // MuiToolbar: {
            //     styleOverrides: {
            //         root: {
            //             color: Colors.white[200],
            //         },
            //     },
            // },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    outlined: { textTransform: 'none' },
                    outlinedPrimary: {},
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: Colors.darkBlack[300],
                    },
                },
            },
            MuiTabs: {},
            MuiTab: {},
        },
    },
    className: 'blui-dark',
    landingPageBanner: {
        backgroundImage: `url(${circles})`,
        backgroundSize: 1200,
    },
};
