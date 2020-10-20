import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageContent } from '../components';
import { useBackgroundColor } from '../hooks/useBackgroundColor';
import { useTheme } from '@material-ui/core';
import * as Colors from '@pxblue/colors';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';

export type MarkdownPageProps = {
    title: string;
    markdown: React.FC;
    noPadding?: boolean;
    background?: string;
    wideLayout?: boolean;
};

export const MarkdownPage: React.FC<MarkdownPageProps> = (props): JSX.Element => {
    usePageTitle(props.title);
    useGoogleAnalyticsPageView();
    const theme = useTheme();
    if (props.background === 'light') {
        useBackgroundColor(theme.palette.background.paper);
    } else if (props.background === 'dark') {
        useBackgroundColor(theme.palette.type === 'light' ? Colors.white[200] : theme.palette.background.default);
    } else {
        useBackgroundColor(props.background);
    }
    return (
        <PageContent noPadding={props.noPadding} wideLayout={props.wideLayout}>
            <props.markdown />
        </PageContent>
    );
};
MarkdownPage.displayName = 'MarkdownPage';
MarkdownPage.defaultProps = {
    background: 'light',
};
