# Holiday Schedule System

## Overview

The holiday schedule system has been updated to dynamically fetch dates from the `holiday-schedule.json` file based on the current year. This allows for automatic year-based theme switching without requiring manual code updates.

## How It Works

### 1. Holiday Schedule JSON

The `holiday-schedule.json` file contains all holiday dates for multiple years (2026, 2027, 2028):

```json
{
  "christmas": {
    "name": "Christmas",
    "2026": {
      "startDate": "2026-12-19",
      "endDate": "2026-12-25"
    },
    "2027": { ... },
    "2028": { ... }
  }
}
```

### 2. Dynamic Date Loader

The `holidayScheduleLoader.ts` utility provides the `getHolidayDates()` function that:

- Automatically detects the current year
- Reads the corresponding dates from the JSON file
- Converts them to year 1900 format (for compatibility with the existing date comparison system)
- Handles year-wrapping holidays (e.g., New Years: Dec 31 - Jan 6)

### 3. Holiday Theme Files

Migrated holiday theme files (for example, `christmas.ts` and `halloween.ts`) use the dynamic loader:

```typescript
import { getHolidayDates } from './holidayScheduleLoader';

const dates = getHolidayDates('christmas');

export const ChristmasSchedule: Schedule = {
    start: dates?.start ?? new Date(0, 11, 19), // Fallback to default
    end: dates?.end ?? new Date(0, 11, 25),
    config: { ... }
};
```

## Updating Holiday Dates

To add or update holiday dates for a new year:

1. Open `holiday-schedule.json`
2. Add the new year entry for the holiday:
    ```json
    "2029": {
      "startDate": "2029-12-19",
      "endDate": "2029-12-25"
    }
    ```
3. Save the file - no code changes needed!

## Supported Holidays

The following holidays are configured:

- Spring Festival (lunar calendar - varies by year)
- Valentine's Day (Feb 13-15)
- Women's Day (Mar 7-9)
- St. Patrick's Day (Mar 16-18)
- April Fool's Day (Apr 1-2)
- Earth Day (Apr 20-24)
- May the Fourth (May 3-5)
- Independence Day (Jul 1-7)
- Mid Autumn Festival (lunar calendar - varies by year)
- Halloween (Oct 24-30)
- Diwali (varies by year)
- Thanksgiving (varies by year)
- Hanukkah (varies by year)
- Christmas (Dec 19-25)
- Kwanzaa (Dec 29-31)
- New Years (Dec 31 - Jan 6)

## Fallback Behavior

Each theme includes fallback dates in case:

- The current year is not in the JSON file
- The JSON file cannot be loaded
- The holiday key is not found

This ensures the application continues to work even if the JSON is outdated.

## Technical Details

### Date Format

- JSON dates: `YYYY-MM-DD` format
- Internal dates: Year 1900 for year-independent comparison
- Year wrapping: Automatically handled (sets year to 1 for end dates before start dates)

### Type Safety

Full TypeScript support with proper type definitions for:

- Holiday schedule data structure
- Year data entries
- Return types from the loader function
