import { HalloweenSchedule } from './halloween';
import { MayTheFourthSchedule } from './may-the-fourth';
import { ChristmasSchedule } from './christmas';
import { defaultTheme } from './default';
import { Schedule, SiteConfig } from './_types';
import { DiwaliSchedule } from './diwali';
import { WomenSDaySchedule } from './women-s-day';
import { ThanksgivingSchedule } from './thanksgiving';
import { HanukkahSchedule } from './hanukkah';
import { KwanzaaSchedule } from './kwanzaa';
import { NewYearsSchedule } from './new-years';
import { SpringFestivalSchedule } from './spring-festival';
import { StPatricksDaySchedule } from './st-patricks-day';
import { EarthDaySchedule } from './earth-day';
import { IndependenceDaySchedule } from './independence-day';
import { MidAutumnSchedule } from './mid-autumn-festival';
import { AprilFoolsDaySchedule } from './april-fools-day';
import { ValentineSchedule } from './valentine-s-day';

/**
 * Add more holiday themes here.
 *
 * Current schedules:
 * * Feb 1 - Feb 7 2022: Spring Festival (changes each year)  ** Jan 21 - Jan 27 2023 | Feb 9 - Feb 15 2024 **
 * * Feb 12 - Feb 14: Valentine's Day
 * * Mar 7 - Mar 9: Women's Day
 * * Mar 16 - Mar 18: St. Patrick's Day
 * * Apr 1: April Fool's Day
 * * Apr 20 - Apr 24: Earth Day
 * * May 3 - May 5: May the Fourth Day
 * * July 2 - July 7: Independence Day
 * * Sept 20 - Sept 27: Mid Autumn Festival (changes each year)
 * * Oct 25 - Nov 1: Halloween
 * * Nov 2 - Nov 6 2021: Diwali (changes each year)  ** November 10 - November 14 2023 **
 * * Nov 21 - Nov 27: Thanksgiving (changes each year)  ** Nov 23 2023 **
 * * Dec 18 - Dec 23: Hanukkah (changes each year)  ** Dec 7 - Dec 15 2023 **
 * * Dec 23 - Dec 26: Christmas
 * * Dec 26 - Dec 30: Kwanzaa (Kwanzaa runs until Jan 1. Cutting this short to account for New Years.)
 * * Dec 31 - Jan 6: New Years
 */
export const schedule: Schedule[] = [
    ThanksgivingSchedule,
    WomenSDaySchedule,
    DiwaliSchedule,
    ChristmasSchedule,
    HalloweenSchedule,
    AprilFoolsDaySchedule,
    MayTheFourthSchedule,
    HanukkahSchedule,
    KwanzaaSchedule,
    NewYearsSchedule,
    SpringFestivalSchedule,
    StPatricksDaySchedule,
    EarthDaySchedule,
    IndependenceDaySchedule,
    MidAutumnSchedule,
    ValentineSchedule,
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
