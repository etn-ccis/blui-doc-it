import React from 'react';

export type PageContentProps = {
    noPadding?: boolean;
};

export const PageContent: React.FC<PageContentProps> = (props): JSX.Element => (
    <div style={{ padding: props.noPadding ? 0 : 20, maxWidth: 1024, margin: '0 auto' }}>{props.children}</div>
);
