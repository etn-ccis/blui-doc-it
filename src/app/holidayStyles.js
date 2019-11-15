import * as ThemeColors from '@pxblue/colors';

const typography = {
    fontFamily: '"Open Sans", Helvetica, Roboto, sans-serif',
    useNextVariants: true
};

const input = {
    bottomLine: ThemeColors.black['500'],
    helperText: ThemeColors.black['500'],
    labelText: ThemeColors.black['500'],
    inputText: ThemeColors.black['500']
};

const background = {
    default:  ThemeColors.gray['50'],
    paper: ThemeColors.white['50']
};

const action = {
    active:"rgba(0, 0, 0, .6)",
    disabled:"rgba(0, 0, 0, .25)"
};

const pine = {
    50: '#e6edea',
    100: '#c0d1cb',
    200: '#97b3a8',
    300: '#6d9485',
    400: '#4d7e6a',
    500: '#2e6750',
    600: '#295f49',
    700: '#235440',
    800: '#1d4a37',
    900: '#123927',
    A400: '#2e6750',
};

const wine = {
    50: '#f3e2e7',
    100: '#e1b7c2',
    200: '#ce8799',
    300: '#ba5670',
    400: '#ab3252',
    500: '#9c0e33',
    600: '#940c2e',
    700: '#8a0a27',
    800: '#800820',
    900: '#6e0414',
    A400: '#9c0e33',
    'contrastDefaultColor': 'light'
};

const rust = {
    50: '#f8ede5',
    100: '#f0d5bd',
    200: '#e8b892',
    300: '#e09c66',
    400: '#d78645',
    500: '#d17126',
    600: '#cc6a21',
    700: '#c55f1e',
    800: '#c05516',
    900: '#b5430f',
    A100: '#101417',
    A200: '#181f22',
    A400: '#e36b16',
    A700: '#000000',
    'contrastDefaultColor': 'light'
};

export const winterTheme =
    {
        navbarBackground: {
            backgroundImage: "url(" + require('./icons/snowflake.svg') + ")",
            backgroundRepeat: 'repeat-x',
            backgroundPositionY: 'center',
            backgroundBlendMode: 'soft-light',
            backgroundSize: '60px'
        },
        palette:{
            primary: wine,
            secondary: pine,
            error: ThemeColors.red,
            background: background,
            action: action,
            line: {stepper: ThemeColors.white['500']},
            input: input
        },
        typography: typography,
        direction: "ltr",
        overrides:{
            // APP BAR OVERRIDES
            MuiAppBar:{
                colorDefault:{
                    color: ThemeColors.black['500'],
                    backgroundColor: ThemeColors.gray['50']
                },
                colorSecondary:{
                    backgroundColor: pine['700']
                }
            }
        }
    };

export const fallTheme =
    {
        navbarBackground: {
            backgroundImage: "url(" + require('./icons/leaves.png') + ")",
            backgroundRepeat: 'repeat-x',
            backgroundPositionY: 'center',
            backgroundSize: '300px'
        },
        palette:{
            primary: rust,
            secondary: ThemeColors.gray,
            error: ThemeColors.red,
            background: background,
            action: action,
            line: {stepper: ThemeColors.yellow['500']},
            input: input
        },
        typography: typography,
        direction: "ltr",
        overrides:{
            // APP BAR OVERRIDES
            MuiAppBar:{
                colorDefault:{
                    color: ThemeColors.black['500'],
                    backgroundColor: ThemeColors.gray['50']
                },
                colorSecondary:{
                    backgroundColor: ThemeColors.yellow['700']
                }
            }
        }
    };
