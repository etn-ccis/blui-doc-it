import React from 'react';

// Full Release Notes
import R22 from './R22/R22.mdx';
import R21 from './R21/R21.mdx';
import R20 from './R20/R20.mdx';
import R19 from './R19/R19.mdx';
import R18 from './R18/R18.mdx';
import R17 from './R17/R17.mdx';
import R16 from './R16/R16.mdx';
import R15 from './R15/R15.mdx';
import R14 from './R14/R14.mdx';
import R13 from './R13/R13.mdx';
import R12 from './R12/R12.mdx';
import R11 from './R11/R11.mdx';
import R10 from './R10/R10.mdx';
import R9 from './R9/R9.mdx';
import R8 from './R8/R8.mdx';
import R7 from './R7/R7.mdx';

// Summaries (for Landing Page)
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
        title: 'R22',
        date: 'Dec 2021',
        version: '3.0.0',
        details: <R21 />,
        summary: <R21Summary />,
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
