import React, { HTMLAttributes, useMemo } from 'react';
import * as Colors from '@brightlayer-ui/colors';
import { useBackgroundColor } from '../../hooks/useBackgroundColor';
import { PAGE_WIDTH, PADDING, TOC_WIDTH } from '../../shared';
import { Spacer } from '@brightlayer-ui/react-components';
import { AppState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export type PageContentProps = HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
    backgroundColor?: string;
    wideLayout?: boolean;
};

export const PageContent: React.FC<PageContentProps> = (props): JSX.Element => {
    const { noPadding, children, style, backgroundColor, wideLayout, ...other } = props;
    const theme = useTheme();
    const hasTOC = useSelector((state: AppState) => state.app.hasTOC);
    const showFixedTOC = useMediaQuery(theme.breakpoints.up('lg'));
    const pageBodyWidth = useMemo((): number => {
        if (wideLayout) {
            return PAGE_WIDTH.WIDE;
        }
        return PAGE_WIDTH.REGULAR;
    }, [wideLayout]);

    useBackgroundColor(backgroundColor);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {hasTOC && (
                <Spacer
                    sx={{
                        display: showFixedTOC ? 'block' : 'none',
                    }}
                    flex={0}
                    width={TOC_WIDTH}
                />
            )}
            <div
                style={Object.assign(
                    {
                        width: '100%',
                        padding: noPadding ? 0 : PADDING,
                        maxWidth: pageBodyWidth,
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
