import * as ThemeColors from '@pxblue/colors';
import * as BrandingColors from '@pxblue/colors-branding';
BrandingColors.pine['A400'] = BrandingColors.pine[500];
BrandingColors.rust['A400'] = BrandingColors.rust[500];
BrandingColors.wine['A400'] = BrandingColors.wine[500];

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

export const winterTheme =
    {
        navbarBackground: {
            backgroundImage: "url(" + require('../icons/snowflake.svg') + ")",
            backgroundRepeat: 'repeat-x',
            backgroundPositionY: 'center',
            backgroundBlendMode: 'soft-light',
            backgroundSize: '60px'
        },
        palette:{
            primary: BrandingColors.wine,
            secondary: BrandingColors.pine,
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
                    backgroundColor: BrandingColors.pine['700']
                }
            },
            container: {
                color: BrandingColors.pine[900],
                backgroundColor: BrandingColors.wine[50]
            },
            drawerPaper: {
                background: 'white'
            },
            navIconShown: {
                background: BrandingColors.wine[500]
            }
        }
    };

export const fallTheme =
    {
        navbarBackground: {
            backgroundImage: "url(" + require('../icons/leaves.png') + ")",
            backgroundRepeat: 'repeat-x',
            backgroundPositionY: 'center',
            backgroundSize: '300px'
        },
        palette:{
            primary: BrandingColors.rust,
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
            container: {
                color: BrandingColors.toad[900],
                backgroundColor: BrandingColors.sunset[50]
            },
            drawerPaper: {
                background: BrandingColors.toad[50]
            },
            navIconShown: {
                background: BrandingColors.rust[500]
            }
        }
    };
