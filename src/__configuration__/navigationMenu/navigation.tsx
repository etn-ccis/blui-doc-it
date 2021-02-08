import React from 'react';
import * as Docs from '../../docs';
import { MarkdownPage, Resources, Roadmap, ReleaseNotes } from '../../app/pages';

export type SimpleNavItem = {
    title: string;
    url?: string;
    icon?: JSX.Element;
    pages?: SimpleNavItem[];
    component?: JSX.Element;
    hidden?: boolean;
};

export type RedirectItem = {
    oldUrl: string;
    newUrl: string;
};

// Change scripts/crawl/sitemap.json after you make changes here.
export const pageDefinitions: SimpleNavItem[] = [
    {
        title: 'What is PX Blue?',
        url: '/overview',
        component: <MarkdownPage title={'What is PX Blue?'} markdown={Docs.Overview} />,
    },
    {
        title: 'Starting a Project',
        url: '/get-started',
        pages: [
            {
                title: 'Where to Begin?',
                url: '/new-project',
                component: <MarkdownPage title={'Where to Begin?'} markdown={Docs.GetStarted.NewProject} />,
            },
            {
                title: 'Web Apps',
                url: '/web',
                component: <MarkdownPage title={'Web Apps'} markdown={Docs.GetStarted.Web} />,
            },
            {
                title: 'Mobile Apps',
                url: '/mobile',
                component: <MarkdownPage title={'Mobile Apps'} markdown={Docs.GetStarted.Mobile} />,
            },
        ],
    },
    {
        title: 'Developing w/ PX Blue',
        url: '/development',
        pages: [
            {
                title: 'Environment Setup',
                url: '/environment',
                component: (
                    <MarkdownPage title={'Environment Setup for Developers'} markdown={Docs.Development.Environment} />
                ),
            },
            {
                title: 'PX Blue CLI',
                url: '/cli',
                component: <MarkdownPage title={'PX Blue CLI'} markdown={Docs.Development.CLI} />,
            },
            {
                title: 'Web Frameworks',
                url: '/frameworks-web',
                pages: [
                    {
                        title: 'Introduction',
                        url: '/intro',
                        component: (
                            <MarkdownPage
                                title={'Web Framework Introduction'}
                                markdown={Docs.Development.WebFrameworks.Intro}
                            />
                        ),
                    },
                    {
                        title: 'Angular Guide',
                        url: '/angular',
                        component: (
                            <MarkdownPage title={'Angular Guide'} markdown={Docs.Development.WebFrameworks.Angular} />
                        ),
                    },
                    {
                        title: 'React Guide',
                        url: '/react',
                        component: (
                            <MarkdownPage title={'React Guide'} markdown={Docs.Development.WebFrameworks.React} />
                        ),
                    },
                ],
            },
            {
                title: 'Mobile Frameworks',
                url: '/frameworks-mobile',
                pages: [
                    {
                        title: 'Introduction',
                        url: '/intro',
                        component: (
                            <MarkdownPage
                                title={'Mobile Framework Introduction'}
                                markdown={Docs.Development.MobileFrameworks.Intro}
                            />
                        ),
                    },
                    {
                        hidden: true,
                        title: 'Apache Cordova Guide',
                        url: '/cordova',
                        component: (
                            <MarkdownPage
                                title={'Apache Cordova Guide'}
                                markdown={Docs.Development.MobileFrameworks.Cordova}
                            />
                        ),
                    },
                    {
                        title: 'Ionic Guide',
                        url: '/ionic',
                        component: (
                            <MarkdownPage title={'Ionic Guide'} markdown={Docs.Development.MobileFrameworks.Ionic} />
                        ),
                    },
                    {
                        title: 'React Native Guide',
                        url: '/react-native',
                        component: (
                            <MarkdownPage
                                title={'React Native Guide'}
                                markdown={Docs.Development.MobileFrameworks.ReactNative}
                            />
                        ),
                    },
                ],
            },
            {
                title: 'Testing',
                url: '/testing',
                component: <MarkdownPage title={'Testing'} markdown={Docs.Development.Testing} />,
            },
        ],
    },
    {
        title: 'Designing w/ PX Blue',
        url: '/design',
        pages: [
            {
                title: 'Introduction',
                url: '/intro',
                component: <MarkdownPage title={'Design Introduction'} markdown={Docs.Design.Introduction} />,
            },
            {
                title: 'Design System Anatomy',
                url: '/anatomy',
                component: <MarkdownPage title={'Design System Anatomy'} markdown={Docs.Design.Anatomy} wideLayout />,
            },
            {
                title: 'Accessibility',
                url: '/accessibility',
                component: <MarkdownPage title={'Accessibility'} markdown={Docs.Design.Accessibility} />,
            },
            {
                title: 'For Websites',
                url: '/websites',
                component: <MarkdownPage title={'Designing for Websites'} markdown={Docs.Design.Websites} />,
            },
            {
                title: 'Project Identity',
                url: '/project-identity',
                component: <MarkdownPage title={'Project Identity'} markdown={Docs.Design.ProjectIdentity} />,
            },
        ],
    },
    {
        title: 'Design Patterns',
        url: '/patterns',
        component: <MarkdownPage title={'Design Patterns'} markdown={Docs.Patterns.Home} />,
        pages: [
            {
                title: 'App Bars',
                url: '/appbar',
                component: <MarkdownPage title={'App Bars'} markdown={Docs.Patterns.AppBar} />,
            },
            {
                title: 'Empty States',
                url: '/empty-states',
                component: <MarkdownPage title={'Empty States'} markdown={Docs.Patterns.EmptyStates} />,
            },
            {
                title: 'Forms and Validation',
                url: '/forms',
                component: <MarkdownPage title={'Forms and Validation'} markdown={Docs.Patterns.Forms} />,
            },
            {
                title: 'Internationalization',
                url: '/internationalization',
                component: <MarkdownPage title={'Internationalization'} markdown={Docs.Patterns.I18N} />,
            },
            {
                title: 'Lists & Tables',
                url: '/lists',
                component: <MarkdownPage title={'Lists & Tables'} markdown={Docs.Patterns.Lists} />,
            },
            {
                title: 'Loading & Waiting',
                url: '/loading',
                component: <MarkdownPage title={'Loading & Waiting'} markdown={Docs.Patterns.Loading} />,
            },
            {
                title: 'Navigation',
                url: '/navigation',
                component: <MarkdownPage title={'Navigation'} markdown={Docs.Patterns.Navigation} />,
            },
            {
                title: 'Overlays',
                url: '/overlay',
                component: <MarkdownPage title={'Overlays'} markdown={Docs.Patterns.Overlays} />,
            },
            {
                title: 'Page Layout',
                url: '/layout',
                component: <MarkdownPage title={'Page Layout'} markdown={Docs.Patterns.Layout} />,
                hidden: true,
            },
            {
                title: 'Steppers',
                url: '/steppers',
                component: <MarkdownPage title={'Steppers'} markdown={Docs.Patterns.Steppers} />,
            },
            {
                title: 'User Authentication',
                url: '/user-auth',
                component: <MarkdownPage title={'User Authentication'} markdown={Docs.Patterns.UserAuth} />,
            },
            {
                title: 'Visualizations',
                url: '/visualizations',
                component: <MarkdownPage title={'Visualizations'} markdown={Docs.Patterns.Visualizations} />,
            },
        ],
    },
    {
        title: 'Style Guide',
        url: '/style',
        component: <MarkdownPage title={'Style Guide'} markdown={Docs.Style.Home} />,
        pages: [
            {
                title: 'Color Palette',
                url: '/color',
                component: <MarkdownPage title={'Color Palette'} markdown={Docs.Style.Color} />,
            },
            {
                title: 'Iconography',
                url: '/iconography',
                component: (
                    <MarkdownPage title={'Iconography'} markdown={Docs.Style.Iconography} background={'dark'} sidebar />
                ),
            },
            {
                title: 'Illustrations',
                url: '/illustrations',
                component: <MarkdownPage title={'Illustrations'} markdown={Docs.Style.Illustrations} />,
            },
            {
                title: 'Typography',
                url: '/typography',
                component: <MarkdownPage title={'Typography'} markdown={Docs.Style.Typography} />,
            },
            {
                title: 'Themes',
                url: '/themes',
                component: <MarkdownPage title={'Themes'} markdown={Docs.Style.Themes} />,
            },
        ],
    },
    {
        title: 'Community',
        url: '/community',
        component: <MarkdownPage title={'PX Blue Community'} markdown={Docs.Community.Home} />,
        pages: [
            {
                title: 'Licensing',
                url: '/license',
                component: <MarkdownPage title={'Licensing'} markdown={Docs.Community.License} />,
            },
            {
                title: 'Innersourcing',
                url: '/innersourcing',
                component: <MarkdownPage title={'Innersourcing'} markdown={Docs.Community.Innersourcing} />,
            },
            {
                title: 'Report Bugs',
                url: '/bugs',
                component: <MarkdownPage title={'Report Bugs'} markdown={Docs.Community.Bugs} />,
            },
            {
                title: 'Request Features',
                url: '/features',
                component: <MarkdownPage title={'Request Features'} markdown={Docs.Community.Features} />,
            },
            {
                title: 'FAQ',
                url: '/faq',
                component: <MarkdownPage title={'FAQ'} markdown={Docs.Community.FAQ} />,
            },
            {
                title: 'Our Team',
                url: '/our-team',
                component: <MarkdownPage title={'Our Team'} markdown={Docs.Community.OurTeam} background={'dark'} />,
            },
            {
                title: 'Contact Us',
                url: '/contactus',
                component: <MarkdownPage title={'Contact Us'} markdown={Docs.Community.Contact} />,
            },
        ],
    },
    {
        title: 'Resources',
        url: '/resources',
        component: <Resources />,
    },
    {
        title: 'Roadmap',
        url: '/roadmap',
        component: <Roadmap />,
    },
    {
        title: 'Release Notes',
        url: '/release-notes',
        component: <ReleaseNotes />,
    },
];

export const pageRedirects: RedirectItem[] = [
    {
        oldUrl: '/patterns/login',
        newUrl: '/patterns/user-auth',
    },
];
