import { ThemeOptions } from '@material-ui/core';
import { HalloweenTheme } from './Halloween';
import * as PXBThemes from '@pxblue/react-themes';

// landing page banner background images
import circles from '../../app/assets/circles.svg';
import castles from '../../app/assets/home/castles.svg';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type SiteConfig = {
    theme: ThemeOptions;
    landingPageBanner: {
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
        start: new Date(0, 9, 25), // Oct 25
        end: new Date(0, 10, 2), // Nov 02
        config: {
            theme: HalloweenTheme,
            landingPageBanner: {
                src: castles,
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
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
