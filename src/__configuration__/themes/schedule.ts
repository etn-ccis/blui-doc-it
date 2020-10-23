import { HalloweenSchedule } from './Halloween';
import { defaultTheme } from './default';
import { Schedule, SiteConfig } from './types';

// Add more holiday themes here
export const schedule: Schedule[] = [HalloweenSchedule];

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
            duration.end.setFullYear(1900);
            if (duration.start <= currentDate || currentDate <= duration.end) {
                return duration.config;
            }
        }
    }

    // didn't find a holiday theme, fall back to the default blue theme
    return defaultTheme;
};
