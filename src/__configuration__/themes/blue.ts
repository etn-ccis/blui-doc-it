import * as BLUIThemes from '@brightlayer-ui/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './_types';
import * as Colors from '@brightlayer-ui/colors';

export const blueTheme: SiteConfig = {
    theme: {
        ...BLUIThemes.blue,
        components: {
            ...BLUIThemes.blue.components,
            MuiButton: {
                styleOverrides: {
                    ...BLUIThemes.blue.components?.MuiButton?.styleOverrides,
                    outlined: {
                        borderColor: Colors.white[50],
                    },
                },
            },
        },
    },
    landingPageBanner: { backgroundImage: `url(${circles})`, backgroundSize: 1200 },
};
