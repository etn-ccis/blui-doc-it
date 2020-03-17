import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageContent } from '../components';

export type MarkdownPageProps = {
    title: string;
    markdown: React.FC;
    noPadding?: boolean;
};

export const MarkdownPage: React.FC<MarkdownPageProps> = (props): JSX.Element => {
    usePageTitle(props.title);
    return (
        <PageContent noPadding={props.noPadding}>
            <props.markdown />
        </PageContent>
    );
};
