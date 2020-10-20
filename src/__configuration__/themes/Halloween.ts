import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';

export const HalloweenTheme = {
    ...PXBThemes.blueDark,
    palette: {
        ...PXBThemes.blueDark.palette,
        primary: {
            light: Colors.orange[300],
            main: Colors.orange[500],
            dark: Colors.orange[900],
        },
        secondary: {
            light: Colors.gold[300],
            main: Colors.gold[500],
            dark: Colors.gold[900],
        },
        background: {
            default: Colors.darkBlack[100],
            paper: Colors.black[900],
        },
        text: {
            primary: Colors.black[50],
            secondary: Colors.black[200],
            hint: Colors.black[200],
        },
    },
    overrides: {
        ...PXBThemes.blueDark.overrides,
        MuiAppBar: {
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
        MuiBackdrop: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
        },
        MuiButton: {
            ...PXBThemes.blueDark.overrides?.MuiButton,
            outlined: {},
            outlinedPrimary: {},
        },
        MuiDrawer: {
            paper: {
                backgroundColor: Colors.darkBlack[300],
            },
        },
        MuiTabs: {},
    },
};
