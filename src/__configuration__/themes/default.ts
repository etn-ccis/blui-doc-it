import * as PXBThemes from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './types';

export const defaultTheme: SiteConfig = {
    theme: {
        ...PXBThemes.blue,
        overrides: {
            ...PXBThemes.blue.overrides,
            MuiAppBar: {
                ...PXBThemes.blue.overrides?.MuiAppBar,
                colorDefault: {
                    color: Colors.white[50],
                    backgroundColor: Colors.blue[500],
                },
                colorPrimary: {
                    color: Colors.white[50],
                    backgroundColor: Colors.blue[500],
                },
                colorSecondary: {
                    color: Colors.white[50],
                    backgroundColor: Colors.blue[700],
                    '& .MuiInputBase-root': {
                        color: Colors.white[50],
                    },
                    '& .MuiSelect-icon': {
                        color: Colors.white[50],
                    },
                },
            },
        },
    },
    landingPageBanner: { src: circles, backgroundSize: 1200 },
};
