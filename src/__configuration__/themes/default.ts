import * as BLUIThemes from '@brightlayer-ui/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './_types';

export const defaultTheme: SiteConfig = {
    theme: BLUIThemes.blue,
    landingPageBanner: { backgroundImage: `url(${circles})`, backgroundSize: 1200 },
};
