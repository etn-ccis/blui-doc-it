import React, { HTMLAttributes } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageContent } from '../components';
import { useBackgroundColor } from '../hooks/useBackgroundColor';
import { useTheme } from '@material-ui/core';
import * as Colors from '@pxblue/colors';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';

export type MarkdownPageProps = HTMLAttributes<HTMLDivElement> & {
    title: string;
    markdown: React.FC;
    noPadding?: boolean;
    background?: string;
    wideLayout?: boolean;
};

export const MarkdownPage: React.FC<MarkdownPageProps> = (props): JSX.Element => {
    const { title, markdown: Markdown, noPadding, background, wideLayout, ...divProps } = props;
    usePageTitle(title);
    useGoogleAnalyticsPageView();
    const theme = useTheme();
    let backgroundColor = background;
    if (background === 'light') {
        backgroundColor = theme.palette.background.paper;
    } else if (background === 'dark') {
        backgroundColor = theme.palette.type === 'light' ? Colors.white[200] : theme.palette.background.default;
    }
    useBackgroundColor(backgroundColor);

    return (
        <div {...divProps}>
            <PageContent noPadding={noPadding} wideLayout={wideLayout}>
                <Markdown />
            </PageContent>
        </div>
    );
};
MarkdownPage.displayName = 'MarkdownPage';
MarkdownPage.defaultProps = {
    background: 'light',
};
