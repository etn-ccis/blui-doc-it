import { HalloweenSchedule } from './halloween';
import { MayTheFourthSchedule } from './may-the-fourth';
import { ChristmasSchedule } from './christmas';
import { defaultTheme } from './default';
import { Schedule, SiteConfig } from './types';
import { DiwaliSchedule } from './diwali';
import { WomenSDaySchedule } from './women-s-day';
import { ThanksgivingSchedule } from './thanksgiving';
import { HanukkahSchedule } from './hanukkah';
import { KwanzaaSchedule } from './kwanzaa';
import { NewYearsSchedule } from './new-years';
import { SpringFestivalSchedule } from './spring-festival';

/**
 * Add more holiday themes here.
 *
 * Current schedules:
 * * Feb 11 - Feb 18: Spring Festival (changes each year)
 * * Mar 7 - Mar 9: Women's Day
 * * May 3 - May 5: May the Fourth Day
 * * Oct 14 - Nov 2: Halloween
 * * Nov 11 - Nov 17: Diwali (changes each year)
 * * Nov 22 - Nov 30: Thanksgiving (changes each year)
 * * Dec 10 - Dec 18: Hanukkah (changes each year)
 * * Dec 23 - Dec 25: Christmas
 * * Dec 26 - Dec 30: Kwanzaa (Kwanzaa runs until Jan 1. Cutting this short to account for New Years.)
 * * Dec 31 - Jan 6: New Years
 */
export const schedule: Schedule[] = [
    ThanksgivingSchedule,
    WomenSDaySchedule,
    DiwaliSchedule,
    ChristmasSchedule,
    HalloweenSchedule,
    MayTheFourthSchedule,
    HanukkahSchedule,
    KwanzaaSchedule,
    NewYearsSchedule,
    SpringFestivalSchedule,
];

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
