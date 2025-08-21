// import * as BLUIThemes from '@brightlayer-ui/react-themes';
import { theme } from "@brightlayer-ui/react-themes";
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './_types';
import * as Colors from '@brightlayer-ui/colors';

export const blueDarkTheme: SiteConfig = {
    theme: {
        ...theme,
        components: {
            ...theme.components,
            MuiButton: {
                styleOverrides: {
                    ...theme.components?.MuiButton?.styleOverrides,
                    outlined: {
                        borderColor: Colors.black[500],
                    },
                },
            },
        },
    },
    className: 'blui-dark',
    landingPageBanner: { backgroundImage: `url(${circles})`, backgroundSize: 1200 },
};
