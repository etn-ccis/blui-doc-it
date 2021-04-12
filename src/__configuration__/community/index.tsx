import React from 'react';
import {
    Gavel,
    BugReport,
    EmojiObjects,
    QuestionAnswer,
    Group,
    Drafts,
    ImportExport,
    Person,
} from '@material-ui/icons';
import * as Colors from '@pxblue/colors';
import * as BrandingColors from '@pxblue/colors-branding';

export const links = [
    {
        title: 'License',
        url: '/community/license',
        description: `Learn about the open source license under which PX Blue is made available.`,
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
        title: 'Innersourcing',
        url: '/community/innersourcing',
        description: `Help improve PX Blue for others by sharing your work with the larger community.`,
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
        description: `Have an idea for a new addition to PX Blue? Tell us about it!`,
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
        description: `Read answers to common questions about using PX Blue.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <QuestionAnswer fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: BrandingColors.navy[300],
        },
    },
    {
        title: 'Attributions',
        url: '/community/attributions',
        description: `Attributions to assets used on this website.`,
        image: (
            <span style={{ fontSize: 120, color: 'white', display: 'flex' }}>
                <Person fontSize={'inherit'} color={'inherit'} />
            </span>
        ),
        background: {
            color: BrandingColors.pine[300],
        },
    },
    {
        title: 'Our Team',
        url: '/community/our-team',
        description: `Meet the people behind PX Blue and learn what makes us tick.`,
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
        description: `We love hearing from you! Feel free to contact us any time to talk about PX Blue or your projects.`,
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
