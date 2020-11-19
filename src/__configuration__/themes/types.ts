import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { ThemeOptions } from '@material-ui/core';

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
    landingPageBanner: {
        backgroundImage: string;
    } & CSSProperties;

    /*
     * Configures the pxblue logo color on the landing page.
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
