import React, { HTMLAttributes } from 'react';
import * as Colors from '@pxblue/colors';
import { useBackgroundColor } from '../../hooks/useBackgroundColor';
import { PAGE_WIDTH, PADDING, TOC_WIDTH } from '../../shared';
import { Spacer } from '@pxblue/react-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { AppState } from '../../redux/reducers';
import { useSelector } from 'react-redux';

export type PageContentProps = HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
    backgroundColor?: string;
    wideLayout?: boolean;
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
    const { noPadding, children, style, backgroundColor, wideLayout, ...other } = props;
    const classes = useStyles();
    const hasTOC = useSelector((state: AppState) => state.app.hasTOC);
    useBackgroundColor(backgroundColor);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {hasTOC && <Spacer className={classes.spacer} flex={0} width={TOC_WIDTH} />}
            <div
                style={Object.assign(
                    {
                        width: '100%',
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
