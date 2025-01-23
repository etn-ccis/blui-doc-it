import React from 'react';

// Full Release Notes
import R34 from './R34/FullNotes.mdx';
import R33 from './R33/FullNotes.mdx';
import R32 from './R32/FullNotes.mdx';
import R31 from './R31/FullNotes.mdx';
import R30 from './R30/FullNotes.mdx';
import R29 from './R29/FullNotes.mdx';
import R28 from './R28/FullNotes.mdx';
import R27 from './R27/FullNotes.mdx';
import R26 from './R26/FullNotes.mdx';
import R25 from './R25/FullNotes.mdx';
import R24 from './R24/FullNotes.mdx';
import R23 from './R23/FullNotes.mdx';
import R22 from './R22/FullNotes.mdx';
import R21 from './R21/FullNotes.mdx';
import R20 from './R20/FullNotes.mdx';
import R19 from './R19/FullNotes.mdx';
import R18 from './R18/FullNotes.mdx';
import R17 from './R17/FullNotes.mdx';
import R16 from './R16/FullNotes.mdx';
import R15 from './R15/FullNotes.mdx';
import R14 from './R14/FullNotes.mdx';
import R13 from './R13/FullNotes.mdx';
import R12 from './R12/FullNotes.mdx';
import R11 from './R11/FullNotes.mdx';
import R10 from './R10/FullNotes.mdx';
import R9 from './R9/FullNotes.mdx';
import R8 from './R8/FullNotes.mdx';
import R7 from './R7/FullNotes.mdx';

// Summaries (for Landing Page)
import R34Summary from './R34/Summary.mdx';
import R33Summary from './R33/Summary.mdx';
import R32Summary from './R32/Summary.mdx';
import R31Summary from './R31/Summary.mdx';
import R30Summary from './R30/Summary.mdx';
import R29Summary from './R29/Summary.mdx';
import R28Summary from './R28/Summary.mdx';
import R27Summary from './R27/Summary.mdx';
import R26Summary from './R26/Summary.mdx';
import R25Summary from './R25/Summary.mdx';
import R24Summary from './R24/Summary.mdx';
import R23Summary from './R23/Summary.mdx';
import R22Summary from './R22/Summary.mdx';
import R21Summary from './R21/Summary.mdx';
import R20Summary from './R20/Summary.mdx';
import R19Summary from './R19/Summary.mdx';
import R18Summary from './R18/Summary.mdx';
import R17Summary from './R17/Summary.mdx';
import R16Summary from './R16/Summary.mdx';
import R15Summary from './R15/Summary.mdx';
import R14Summary from './R14/Summary.mdx';
import R13Summary from './R13/Summary.mdx';
import R12Summary from './R12/Summary.mdx';
import R11Summary from './R11/Summary.mdx';
import R10Summary from './R10/Summary.mdx';
import R9Summary from './R9/Summary.mdx';
import R8Summary from './R8/Summary.mdx';
import R7Summary from './R7/Summary.mdx';

export type ReleaseInfo = {
    title: string;
    date: string;
    version: string;
    details: JSX.Element;
    summary: JSX.Element;
};

const Releases: ReleaseInfo[] = [
    {
        title: 'R34',
        date: 'December 2024',
        version: '4.4.0',
        details: <R34 />,
        summary: <R34Summary />,
    },
    {
        title: 'R33',
        date: 'October 2024',
        version: '4.3.0',
        details: <R33 />,
        summary: <R33Summary />,
    },
    {
        title: 'R32',
        date: 'July 2024',
        version: '4.2.0',
        details: <R32 />,
        summary: <R32Summary />,
    },
    {
        title: 'R31',
        date: 'April 2024',
        version: '4.1.0',
        details: <R31 />,
        summary: <R31Summary />,
    },
    {
        title: 'R30',
        date: 'January 2024',
        version: '4.0.0',
        details: <R30 />,
        summary: <R30Summary />,
    },
    {
        title: 'R29',
        date: 'October 2023',
        version: '3.2.3',
        details: <R29 />,
        summary: <R29Summary />,
    },
    {
        title: 'R28',
        date: 'July 2023',
        version: '3.2.2',
        details: <R28 />,
        summary: <R28Summary />,
    },
    {
        title: 'R27',
        date: 'Apr 2023',
        version: '3.2.1',
        details: <R27 />,
        summary: <R27Summary />,
    },
    {
        title: 'R26',
        date: 'Jan 2023',
        version: '3.2.0',
        details: <R26 />,
        summary: <R26Summary />,
    },
    {
        title: 'R25',
        date: 'Oct 2022',
        version: '3.1.0',
        details: <R25 />,
        summary: <R25Summary />,
    },
    {
        title: 'R24',
        date: 'June 2022',
        version: '3.0.2',
        details: <R24 />,
        summary: <R24Summary />,
    },
    {
        title: 'R23',
        date: 'Mar 2022',
        version: '3.0.1',
        details: <R23 />,
        summary: <R23Summary />,
    },
    {
        title: 'R22',
        date: 'Dec 2021',
        version: '3.0.0',
        details: <R22 />,
        summary: <R22Summary />,
    },
    {
        title: 'R21',
        date: 'Sept 2021',
        version: '2.4.2',
        details: <R21 />,
        summary: <R21Summary />,
    },
    {
        title: 'R20',
        date: 'June 2021',
        version: '2.4.1',
        details: <R20 />,
        summary: <R20Summary />,
    },
    {
        title: 'R19',
        date: 'March 2021',
        version: '2.4.0',
        details: <R19 />,
        summary: <R19Summary />,
    },
    {
        title: 'R18',
        date: 'December 2020',
        version: '2.3.6',
        details: <R18 />,
        summary: <R18Summary />,
    },
    {
        title: 'R17',
        date: 'September 2020',
        version: '2.3.5',
        details: <R17 />,
        summary: <R17Summary />,
    },
    {
        title: 'R16',
        date: 'June 2020',
        version: '2.3.4',
        details: <R16 />,
        summary: <R16Summary />,
    },
    {
        title: 'R15',
        date: 'March 2020',
        version: '2.3.3',
        details: <R15 />,
        summary: <R15Summary />,
    },
    {
        title: 'R14',
        date: 'December 2019',
        version: '2.3.2',
        details: <R14 />,
        summary: <R14Summary />,
    },
    {
        title: 'R13',
        date: 'September 2019',
        version: '2.3.1',
        details: <R13 />,
        summary: <R13Summary />,
    },
    {
        title: 'R12',
        date: 'June 2019',
        version: '2.3.0',
        details: <R12 />,
        summary: <R12Summary />,
    },
    {
        title: 'R11',
        date: 'March 2019',
        version: '2.2.2',
        details: <R11 />,
        summary: <R11Summary />,
    },
    {
        title: 'R10',
        date: 'November 2018',
        version: '2.2.1',
        details: <R10 />,
        summary: <R10Summary />,
    },
    {
        title: 'R9',
        date: 'September 2018',
        version: '2.2.0',
        details: <R9 />,
        summary: <R9Summary />,
    },
    {
        title: 'R8',
        date: 'June 2018',
        version: '2.1.0',
        details: <R8 />,
        summary: <R8Summary />,
    },
    {
        title: 'R7',
        date: 'Feb 2018',
        version: '2.0.0',
        details: <R7 />,
        summary: <R7Summary />,
    },
];
export default Releases;
