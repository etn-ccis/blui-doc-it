import React, { HTMLAttributes } from 'react';

export type PageContentProps = HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
};

export const PageContent: React.FC<PageContentProps> = (props): JSX.Element => {
    const { noPadding, children, style, ...other } = props;
    return (
        <div style={Object.assign({ padding: noPadding ? 0 : 20, maxWidth: 1024, margin: '0 auto' }, style)} {...other}>{children}</div>
    );
}
