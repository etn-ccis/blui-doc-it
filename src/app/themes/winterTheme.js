import * as ThemeColors from '@pxblue/colors';
import {action, background, input, typography} from './constants';

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

const winterTheme =
    {
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
                    color: pine['500'],
                    backgroundColor: ThemeColors.red['50']
                },
                colorSecondary:{
                    backgroundColor: pine['700']
                }
            },

            // TABS OVERRIDES
            MuiTabs:{
                indicator:{
                    backgroundColor: ThemeColors.white['50']
                }
            },

            //LIST ITEM OVERRIDES (plus nav drawer)
            MuiListItem:{
                root:{
                    color: ThemeColors.black['500'],
                    '&:hover':{
                        backgroundColor: 'rgba(0, 0, 0, 0.08)'
                    },
                    // OVERRIDES FOR ACTIVE ROUTE IN SIDE NAVIGATION
                    '&.routeActive':{
                        position: 'relative',
                        '&:hover': {
                            backgroundColor: 'transparent'
                        },
                        '&:before':{
                            content: '""',
                            zIndex: -1,
                            position: 'absolute',
                            height: '100%',
                            width: 'calc(100% - 8px)',
                            left: 0,
                            top: 0,
                            backgroundColor: ThemeColors.red['50'],
                            borderRadius: '0px 24px 24px 0px'
                        },
                        '&.drawerOpen:hover:before':{
                            backgroundColor: pine['100'],
                        },
                        '& svg':{
                            fill: pine['500']
                        }
                    }
                },

            }
        }
    };
export default winterTheme;
