import { HalloweenSchedule } from './halloween';
import { MayTheForthSchedule } from './may-the-forth';
import { ChristmasSchedule } from './christmas';
import { defaultTheme } from './default';
import { Schedule, SiteConfig } from './types';
import { DiwaliSchedule } from './diwali';

/**
 * Add more holiday themes here.
 *
 * Current schedules:
 * * May 3 - May 6: May the Forth Day
 * * Oct 14 - Nov 3: Halloween
 * * Nov 12 - Nov 17: Diwali (Changes each year)
 * * Nov 19 - Nov 30: Thanksgiving (changes each year)
 * * Dec 23 - Dec 26: Christmas
 */
export const schedule: Schedule[] = [DiwaliSchedule, ChristmasSchedule, HalloweenSchedule, MayTheForthSchedule];

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
            // make a copy of the duration end, but starting at year 1900
            const endTemp = new Date(duration.end.getTime());
            endTemp.setFullYear(1900);
            if (duration.start <= currentDate || currentDate <= endTemp) {
                return duration.config;
            }
        }
    }
    // didn't find a holiday theme, fall back to the default blue theme
    return defaultTheme;
};
