import { blueThemes } from '@brightlayer-ui/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './_types';
import * as Colors from '@brightlayer-ui/colors';

export const blueTheme: SiteConfig = {
    theme: {
        // ...blueThemes,
        palette: {
            ...blueThemes.palette,
            mode: 'light',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    outlined: {
                        borderColor: Colors.white[50],
                        textTransform: 'none',
                    },
                },
            },
        },
        typography: blueThemes.typography,
    },
    landingPageBanner: { backgroundImage: `url(${circles})`, backgroundSize: 1200 },
};
