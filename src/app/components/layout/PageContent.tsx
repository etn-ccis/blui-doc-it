import React, { HTMLAttributes } from 'react';
import * as Colors from '@pxblue/colors';
import { useBackgroundColor } from '../../hooks/useBackgroundColor';
import { PAGE_WIDTH, PADDING } from '../../shared';

export type PageContentProps = HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
    backgroundColor?: string;
    wideLayout?: boolean;
};

export const PageContent: React.FC<PageContentProps> = (props): JSX.Element => {
    const { noPadding, children, style, backgroundColor, wideLayout, ...other } = props;
    useBackgroundColor(backgroundColor);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
                style={Object.assign(
                    {
                        padding: noPadding ? 0 : PADDING,
                        maxWidth: wideLayout ? PAGE_WIDTH.WIDE : PAGE_WIDTH.REGULAR,
                        // margin: '0 auto',
                    },
                    style
                )}
                {...other}
            >
                {children}
            </div>
        </div>
    );
};
PageContent.displayName = 'PageContent';
PageContent.defaultProps = {
    backgroundColor: Colors.white[50],
};
