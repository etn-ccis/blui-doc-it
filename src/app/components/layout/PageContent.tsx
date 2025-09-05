import React, { HTMLAttributes, useMemo } from 'react';
import * as Colors from '@brightlayer-ui/colors';
import { useBackgroundColor } from '../../hooks/useBackgroundColor';
import { PAGE_WIDTH, PADDING, TOC_WIDTH } from '../../shared';
import { Spacer } from '@brightlayer-ui/react-components';
import { useAppSelector, RootState } from '../../redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export type PageContentProps = HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
    backgroundColor?: string;
    wideLayout?: boolean;
};

export const PageContent: React.FC<PageContentProps> = (props): React.JSX.Element => {
    const { noPadding, children, style, wideLayout, backgroundColor = Colors.white[50], ...other } = props;
    const theme = useTheme();
    const hasTOC = useAppSelector((state: RootState) => state.app.hasTOC);
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
