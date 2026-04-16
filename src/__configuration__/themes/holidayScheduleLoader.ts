import holidayScheduleData from './holiday-schedule.json';

type YearData = {
    startDate: string;
    endDate: string;
};

type HolidayData = {
    name: string;
    [year: string]: string | YearData; // Allow both 'name' property and year keys
};

type HolidayScheduleData = Record<string, HolidayData>;

const scheduleData: HolidayScheduleData = holidayScheduleData;

export type HolidayDates = {
    start: Date;
    end: Date;
};

/**
 * Gets the start and end dates for a holiday from the JSON schedule for the current year
 * @param holidayKey - The key of the holiday in the JSON file (e.g., 'christmas', 'halloween')
 * @returns An object with start and end Date objects, or null if not found
 */
export const getHolidayDates = (holidayKey: string): HolidayDates | null => {
    const currentYear = new Date().getFullYear();
    const holidayData = scheduleData[holidayKey];

    if (!holidayData) {
        console.error(`Holiday '${holidayKey}' not found in schedule`);
        return null;
    }

    const yearData = holidayData[currentYear.toString()];

    if (!yearData || typeof yearData === 'string') {
        console.error(`Year ${currentYear} not found for holiday '${holidayKey}'`);
        return null;
    }

    // Parse the dates (format: YYYY-MM-DD)
    const startDate = new Date(yearData.startDate);
    const endDate = new Date(yearData.endDate);

    // Convert to year 1900 for compatibility with existing date comparison logic
    // The existing system uses year 1900 to do year-independent date comparisons
    const start = new Date(0, startDate.getMonth(), startDate.getDate());
    const end = new Date(0, endDate.getMonth(), endDate.getDate());

    // Handle year wrapping (e.g., New Years: Dec 31 - Jan 6)
    if (end < start) {
        end.setFullYear(1);
    }

    return { start, end };
};
