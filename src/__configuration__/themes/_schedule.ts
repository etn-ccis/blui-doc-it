import { HalloweenSchedule } from './halloween';
import { MayTheFourthSchedule } from './may-the-fourth';
import { ChristmasSchedule } from './christmas';
import { blueTheme } from './blue';
import { blueDarkTheme } from './blueDark';
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
 * * Feb 6 - Feb 12: Spring Festival (changes each year)
 * * Feb 13 - Feb 15: Valentine's Day
 * * Mar 7 - Mar 9: Women's Day
 * * Mar 16 - Mar 18: St. Patrick's Day
 * * Apr 1: April Fool's Day
 * * Apr 20 - Apr 24: Earth Day
 * * May 3 - May 5: May the Fourth Day
 * * July 1 - July 7: Independence Day
 * * Sept 12 - Sept 18: Mid Autumn Festival (changes each year)
 * * Oct 24 - Oct 30: Halloween
 * * Nov 1 - Nov 7: Diwali (changes each year)
 * * Nov 22 - Nov 29: Thanksgiving (changes each year)
 * * Dec 19 - Dec 25: Christmas
 * * Dec 26 - Dec 28: Hanukkah (changes each year)
 * * Dec 29 - Dec 30: Kwanzaa (Kwanzaa runs until Jan 1. Cutting this short to account for New Years.)
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

export const getSelectedSiteConfig = (key: string): SiteConfig => {
    switch (key) {
        case 'thanksgiving':
            return ThanksgivingSchedule.config;
        case 'womens-day':
            return WomenSDaySchedule.config;
        case 'diwali':
            return DiwaliSchedule.config;
        case 'christmas':
            return ChristmasSchedule.config;
        case 'halloween':
            return HalloweenSchedule.config;
        case 'april-fools':
            return AprilFoolsDaySchedule.config;
        case 'may-fourth':
            return MayTheFourthSchedule.config;
        case 'hanukkah':
            return HanukkahSchedule.config;
        case 'kwanzaa':
            return KwanzaaSchedule.config;
        case 'new-years':
            return NewYearsSchedule.config;
        case 'spring-festival':
            return SpringFestivalSchedule.config;
        case 'st-patricks':
            return StPatricksDaySchedule.config;
        case 'earth-day':
            return EarthDaySchedule.config;
        case 'independence-day':
            return IndependenceDaySchedule.config;
        case 'mid-autumn-festival':
            return MidAutumnSchedule.config;
        case 'valentines-day':
            return ValentineSchedule.config;
        case 'dark':
            return blueDarkTheme;
        case 'blue':
        default:
            return blueTheme;
    }
};

/**
 * @returns a site configuration given the currently applied holiday theme
 */
export const getScheduledSiteConfig = (theme?: string): SiteConfig => {
    if (theme && theme !== 'default') return getSelectedSiteConfig(theme);

    const currentDate = new Date();
    currentDate.setFullYear(1900);

    for (const duration of schedule) {
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
    return blueTheme;
};
