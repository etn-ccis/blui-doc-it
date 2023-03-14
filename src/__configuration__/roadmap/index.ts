import { Quarter, Release } from '../../__types__';

export const CURRENT_RELEASE: Release = 'R27';

export const AVAILABLE_RELEASES: Array<{
    name: Release;
    year: number;
    quarter: Quarter;
}> = [
    {
        name: 'R27',
        year: 2023,
        quarter: 'Q1',
    },
    {
        name: 'R26',
        year: 2022,
        quarter: 'Q4',
    },
    {
        name: 'R25',
        year: 2022,
        quarter: 'Q3',
    },
    {
        name: 'R24',
        year: 2022,
        quarter: 'Q2',
    },
    {
        name: 'R23',
        year: 2022,
        quarter: 'Q1',
    },
    {
        name: 'R22',
        year: 2021,
        quarter: 'Q4',
    },
    {
        name: 'R21',
        year: 2021,
        quarter: 'Q3',
    },
    {
        name: 'R20',
        year: 2021,
        quarter: 'Q2',
    },
    {
        name: 'R19',
        year: 2021,
        quarter: 'Q1',
    },
    {
        name: 'R18',
        year: 2020,
        quarter: 'Q4',
    },
    {
        name: 'R17',
        year: 2020,
        quarter: 'Q3',
    },
    {
        name: 'R16',
        year: 2020,
        quarter: 'Q2',
    },
];
