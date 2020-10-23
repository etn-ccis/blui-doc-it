import * as PXBThemes from '@pxblue/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './types';

export const defaultTheme: SiteConfig = {
    theme: PXBThemes.blue,
    landingPageBanner: { src: circles, backgroundSize: 1200 },
};
