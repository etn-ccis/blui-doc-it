import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageContent } from '../components';
import { useBackgroundColor } from '../hooks/useBackgroundColor';
import * as Colors from '@pxblue/colors';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';

export type MarkdownPageProps = {
    title: string;
    markdown: React.FC;
    noPadding?: boolean;
    background?: string;
};

export const MarkdownPage: React.FC<MarkdownPageProps> = (props): JSX.Element => {
    usePageTitle(props.title);
    useGoogleAnalyticsPageView();
    useBackgroundColor(props.background);
    return (
        <PageContent noPadding={props.noPadding}>
            <props.markdown />
        </PageContent>
    );
};
MarkdownPage.displayName = 'MarkdownPage';
MarkdownPage.defaultProps = {
    background: Colors.white[50],
};
