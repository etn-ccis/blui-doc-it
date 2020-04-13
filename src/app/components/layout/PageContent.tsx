import React, { HTMLAttributes } from 'react';
import * as Colors from '@pxblue/colors';
import { useBackgroundColor } from '../../hooks/useBackgroundColor';

export type PageContentProps = HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
    backgroundColor?: string;
    wideLayout?: boolean;
};

const PAGE_WIDTH = {
    WIDE: 1024,
    REGULAR: 660,
}

export const PageContent: React.FC<PageContentProps> = (props): JSX.Element => {
    const { noPadding, children, style, backgroundColor, wideLayout, ...other } = props;
    useBackgroundColor(backgroundColor);

    return (
        <div style={Object.assign({ padding: noPadding ? 0 : 8, maxWidth: wideLayout ? PAGE_WIDTH.WIDE : PAGE_WIDTH.REGULAR, margin: '0 auto' }, style)} {...other}>
            {children}
        </div>
    );
};
PageContent.displayName = 'PageContent';
PageContent.defaultProps = {
    backgroundColor: Colors.white[50],
};
