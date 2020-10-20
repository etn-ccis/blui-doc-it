import { ThemeOptions } from '@material-ui/core';
import { HalloweenTheme } from './Halloween';
import * as PXBThemes from '@pxblue/react-themes';

// landing page banner background images
import circles from '../../app/assets/circles.svg';
import castles from '../../app/assets/home/castles.svg';
import ghosts from '../../app/assets/halloween-appbar-tile.svg';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type SiteConfig = {
    /**
     * A MUI theme to be applied during the scheduled period
     */
    theme: ThemeOptions;

    /**
     * Configuration around the banner image in the landing page
     */
    landingPageBanner: {
        src: string;
    } & CSSProperties;

    /**
     * A theme-specific class name to be used by SASS
     */
    className?: string;

    /**
     * Configuration around the app bar background image
     */
    appBarBackground?: {
        src: string;
    } & CSSProperties;
};

type Schedule = {
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

export const schedule: Schedule[] = [
    {
        start: new Date(0, 9, 14), // Oct 14
        end: new Date(0, 10, 1), // Nov 01
        config: {
            theme: HalloweenTheme,
            landingPageBanner: {
                src: castles,
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
            },
            className: 'halloween',
            appBarBackground: {
                src: ghosts,
            },
        },
    },
    /*
    Example of a new year theme (wrapped to the next year)
    {
        start: new Date(0, 11, 31), // Dec 31
        end: new Date(1, 0, 3),     // Jan 03
        config: {
            theme: NewYearsDayTheme,
            landingPageBanner: Fireworks,
        },
    },
    */
];

export const getScheduledSiteConfig = (): SiteConfig => {
    const currentDate = new Date();
    currentDate.setFullYear(1900);

    for (let i = 0; i < schedule.length; i++) {
        const duration = schedule[i];
        // if did not wrap to the next year
        if (duration.end.getFullYear() === 1900) {
            if (duration.start <= currentDate && currentDate <= duration.end) {
                return duration.config;
            }
        }
        // wrapped to the next year
        else {
            duration.end.setFullYear(1900);
            if (duration.start <= currentDate || currentDate <= duration.end) {
                return duration.config;
            }
        }
    }

    // didn't find a holiday theme, fall back to the default blue theme
    return {
        theme: PXBThemes.blue,
        landingPageBanner: { src: circles, backgroundSize: 1200 },
    };
};
