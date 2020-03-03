import React from 'react';
import R14 from './R14.mdx';
import R13 from './R13.mdx';
import R12 from './R12.mdx';
import R11 from './R11.mdx';
import R10 from './R10.mdx';
import R9 from './R9.mdx';
import R8 from './R8.mdx';
import R7 from './R7.mdx';

export type ReleaseInfo = {
    title: string;
    date: string;
    version: string;
    component: JSX.Element;
}
const Releases: ReleaseInfo[] = [
    {
        title: 'R14 (Q4 2019)',
        date: 'December 31, 2019',
        version: '2.3.2',
        component: <R14/>
    },
    {
        title: 'R13 (Q3 2019)',
        date: 'September 30, 2019',
        version: '2.3.1',
        component: <R13/>
    },
    {
        title: 'R12 (Q2 2019)',
        date: 'June 30, 2019',
        version: '2.3.0',
        component: <R12/>
    },
    {
        title: 'R11 (Q1 2019)',
        date: 'March 31, 2019',
        version: '2.2.2',
        component: <R11/>
    },
    {
        title: 'R10 (Q4 2018)',
        date: 'November 30, 2018',
        version: '2.2.1',
        component: <R10/>
    },
    {
        title: 'R9 (Q3 2018)',
        date: 'September 30, 2018',
        version: '2.2.0',
        component: <R9/>
    },
    {
        title: 'R8 (Q2 2018)',
        date: 'June 30, 2018',
        version: '2.1.0',
        component: <R8/>
    },
    {
        title: 'R7 (Q1 2018)',
        date: 'Feb 1, 2018',
        version: '2.0.0',
        component: <R7/>
    },

]
export default Releases;