import { HalloweenSchedule } from './halloween';
import { MayTheForthSchedule } from './may-the-forth';
import { ChristmasSchedule } from './christmas';
import { defaultTheme } from './default';
import { Schedule, SiteConfig } from './types';

/**
 * Add more holiday themes here.
 *
 * Current schedules:
 * * May 3 - May 5: May the Forth Day
 * * Oct 14 - Nov 2: Halloween
 * * Dec 5 - Dec 26: Christmas
 */
export const schedule: Schedule[] = [ChristmasSchedule, HalloweenSchedule, MayTheForthSchedule];

/**
 * @returns a site configuration given the currently applied holiday theme
 */
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
            // make a copy of the duration end, but starting at year 0
            const endTemp = new Date(0, duration.end.getMonth(), duration.end.getDate());
            if (duration.start <= currentDate || currentDate <= endTemp) {
                return duration.config;
            }
        }
    }

    // didn't find a holiday theme, fall back to the default blue theme
    return defaultTheme;
};
