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
    let backgroundColor = props.background;
    if (props.background === 'light') {
        backgroundColor = theme.palette.background.paper;
    } else if (props.background === 'dark') {
        backgroundColor = theme.palette.type === 'light' ? Colors.white[200] : theme.palette.background.default;
    }
    useBackgroundColor(backgroundColor);
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
