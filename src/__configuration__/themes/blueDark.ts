import * as BLUIThemes from '@brightlayer-ui/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './_types';

export const blueDarkTheme: SiteConfig = {
    theme: BLUIThemes.blueDark,
    landingPageBanner: { backgroundImage: `url(${circles})`, backgroundSize: 1200 },
};
