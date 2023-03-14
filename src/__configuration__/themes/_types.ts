import { ThemeOptions } from '@mui/material';
import { CSSProperties } from '@mui/styles';

export type SiteConfig = {
    /**
     * A MUI theme to be applied during the scheduled period
     */
    theme: ThemeOptions;

    /**
     * Optional fade() value to apply to the primary color for drawer selected items
     */
    drawerActiveBackgroundFade?: number;

    /**
     * Configuration around the banner image in the landing page
     */
    landingPageBanner?: CSSProperties;

    /**
     * Configuration around the banner image in the landing page, for mobile widths
     */
    landingPageBannerMobile?: CSSProperties;

    /*
     * Configures the brightlayer-ui logo color on the landing page.
     */
    logoColor?: string;

    /**
     * A theme-specific class name to be used by SASS
     */
    className?: string;

    /**
     * Configuration around the app bar background image
     */
    appBarBackground?: CSSProperties;

    /**
     * A link to a custom banner text image. Will replace the default ones.
     */
    customBannerText?: CSSProperties;

    /**
     * a tagline for the landing page banner
     */
    landingPageTagline?: string;
};

export type Schedule = {
    /**
     * Start date of the duration (inclusive)
     */
    start: Date;

    /**
     * Ending date of the duration (inclusive)
     */
    end: Date;

    /**
     * If start & end is fulfilled, what configuration to apply to the site
     */
    config: SiteConfig;
};
