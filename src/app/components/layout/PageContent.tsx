import React, { HTMLAttributes } from 'react';
import * as Colors from '@pxblue/colors';
import { useBackgroundColor } from '../../hooks/useBackgroundColor';
import { PAGE_WIDTH, PADDING, TOC_WIDTH } from '../../shared';
import { Spacer } from '@pxblue/react-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

export type PageContentProps = HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
    backgroundColor?: string;
    wideLayout?: boolean;
    hasToC?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacer: {
            display: 'none',
            [theme.breakpoints.up('lg')]: {
                display: 'block',
            },
        },
    })
);

export const PageContent: React.FC<PageContentProps> = (props): JSX.Element => {
    const { noPadding, children, style, backgroundColor, wideLayout, hasToC, ...other } = props;
    const classes = useStyles();
    useBackgroundColor(backgroundColor);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {hasToC && <Spacer className={classes.spacer} flex={0} width={TOC_WIDTH} />}
            <div
                style={Object.assign(
                    {
                        padding: noPadding ? 0 : PADDING,
                        maxWidth: wideLayout ? PAGE_WIDTH.WIDE : PAGE_WIDTH.REGULAR,
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
