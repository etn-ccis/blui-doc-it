import React, { HTMLAttributes } from 'react';
import * as Colors from '@pxblue/colors';
import { useBackgroundColor } from '../../hooks/useBackgroundColor';

export type PageContentProps = HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
    backgroundColor?: string;
};

export const PageContent: React.FC<PageContentProps> = (props): JSX.Element => {
    const { noPadding, children, style, backgroundColor, ...other } = props;
    useBackgroundColor(backgroundColor);

    return (
        <div style={Object.assign({ padding: noPadding ? 0 : 20, maxWidth: 1024, margin: '0 auto' }, style)} {...other}>
            {children}
        </div>
    );
};
PageContent.displayName = 'PageContent';
PageContent.defaultProps = {
    backgroundColor: Colors.white[50],
};
