import React from 'react';
import {
    Gavel,
    BugReport,
    EmojiObjects,
    QuestionAnswer,
    Group,
    Drafts,
    ImportExport,
    Devices,
} from '@mui/icons-material';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';

export * from './BluiProjects';
export * from './BluiProjectsType';

export const links = [
    {
        title: 'License',
        url: '/community/license',
        description: `Learn about the open source license under which Brightlayer UI is made available.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <Gavel fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: BrandingColors.sky[500],
        },
    },
    {
        title: 'Apps Using Brightlayer UI',
        url: '/community/blui-projects',
        description: `A list of published projects built using Brightlayer UI.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <Devices fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: Colors.green[300],
        },
    },
    {
        title: 'Innersourcing',
        url: '/community/innersourcing',
        description: `Help improve Brightlayer UI for others by sharing your work with the larger community.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <ImportExport fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: Colors.orange[300],
        },
    },
    {
        title: 'Report Bugs',
        url: '/community/bugs',
        description: `Found an issue? Let us know so we can fix it!.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <BugReport fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: Colors.red[400],
        },
    },
    {
        title: 'Request Features',
        url: '/community/features',
        description: `Have an idea for a new addition to Brightlayer UI? Tell us about it!`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <EmojiObjects fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: BrandingColors.citron[400],
        },
    },
    {
        title: 'FAQ',
        url: '/community/faq',
        description: `Read answers to common questions about using Brightlayer UI.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <QuestionAnswer fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: BrandingColors.pine[300],
        },
    },
    {
        title: 'Our Team',
        url: '/community/our-team',
        description: `Meet the people behind Brightlayer UI and learn what makes us tick.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <Group fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: Colors.blue[300],
        },
    },
    {
        title: 'Contact Us',
        url: '/community/contactus',
        description: `We love hearing from you! Feel free to contact us any time to talk about Brightlayer UI or your projects.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <Drafts fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: Colors.purple[300],
        },
    },
];
