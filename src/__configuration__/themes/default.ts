import * as BluiThemes from '@brightlayer-ui/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './types';

export const defaultTheme: SiteConfig = {
    theme: BluiThemes.blue,
    landingPageBanner: { backgroundImage: `url(${circles})`, backgroundSize: 1200 },
};
