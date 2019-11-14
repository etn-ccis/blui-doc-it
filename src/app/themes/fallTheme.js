import * as ThemeColors from '@pxblue/colors';
import { typography, input, background, action } from './constants';

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

const fallTheme =
    {
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
            },

            // TABS OVERRIDES
            MuiTabs:{
                indicator:{
                    backgroundColor: '#996633'
                }
            },

            //LIST ITEM OVERRIDES (plus nav drawer)
            MuiListItem:{
                root:{
                    color: ThemeColors.black['500'],
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
                            backgroundColor: ThemeColors.yellow['50'],
                            borderRadius: '0px 24px 24px 0px'
                        },
                        '&.drawerOpen:hover:before':{
                            backgroundColor: ThemeColors.yellow['100'],
                        },
                        '& svg':{
                            fill: rust['500']
                        }
                    }
                },

            }
        }
    };

export default fallTheme;
