import React from 'react';
import * as Docs from '../../docs';
import { MarkdownPage, Resources, Roadmap } from '../../app/pages';

export type SimpleNavItem = {
    title: string;
    url?: string;
    icon?: JSX.Element;
    pages?: SimpleNavItem[];
    component?: JSX.Element;
};

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
                component: <MarkdownPage title={'Environment Setup'} markdown={Docs.Development.Environment} />,
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
                            <MarkdownPage title={'Ionic Guide'} markdown={Docs.Development.MobileFrameworks.Intro} />
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
        title: 'Design Patterns',
        url: '/patterns',
        pages: [
            {
                title: 'App Bars',
                url: '/appbars',
                component: <MarkdownPage title={'App Bars'} markdown={Docs.Patterns.AppBar} />,
            },
            {
                title: 'Empty States',
                url: '/empty-states',
                component: <MarkdownPage title={'Empty States'} markdown={Docs.Patterns.EmptyStates} />,
            },
            {
                title: 'Form Validation',
                url: '/forms',
                component: <MarkdownPage title={'Form Validation'} markdown={Docs.Patterns.Forms} />,
            },
            {
                title: 'Internationalization',
                url: '/internationalization',
                component: <MarkdownPage title={'Internationalization'} markdown={Docs.Patterns.I18N} />,
            },
            {
                title: 'Lists',
                url: '/lists',
                component: <MarkdownPage title={'Lists'} markdown={Docs.Patterns.Lists} />,
            },
            {
                title: 'Login',
                url: '/login',
                component: <MarkdownPage title={'Login'} markdown={Docs.Patterns.Login} />,
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
            },
            {
                title: 'Steppers',
                url: '/steppers',
                component: <MarkdownPage title={'Steppers'} markdown={Docs.Patterns.Steppers} />,
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
        pages: [
            {
                title: 'Color Palette',
                url: '/color',
                component: <MarkdownPage title={'Color Palette'} markdown={Docs.Style.Color} />,
            },
            {
                title: 'Iconography',
                url: '/iconography',
                component: <h1>COMING SOON</h1>,
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
        pages: [
            {
                title: 'Licensing',
                url: '/license',
                component: <MarkdownPage title={'Licensing'} markdown={Docs.Community.License} />,
            },
            {
                title: 'Share Code',
                url: '/share',
                component: <MarkdownPage title={'Sharing Code'} markdown={Docs.Community.Sharing} />,
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
        component: <MarkdownPage title={'Release Notes'} markdown={Docs.ReleaseNotes} />,
    },
];
