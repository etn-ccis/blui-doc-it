import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box, { BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Color from 'color';
import * as BLUIColors from '@brightlayer-ui/colors';

type SectionProps = BoxProps & {
    title: string;
    align?: 'left' | 'center';
    maxWidth?: number;
    background?: 'light' | 'dark';
};
export const Section: React.FC<SectionProps> = (props) => {
    const { title, align, maxWidth, background, sx, children, ...boxProps } = props;
    const theme = useTheme();

    return (
        <Box
            {...boxProps}
            sx={[
                {
                    backgroundColor: background === 'light' ? 'background.paper' : 'background.default',
                    width: '100%',
                    py: 6,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Box
                sx={{
                    my: 0,
                    mx: 'auto',
                    maxWidth,
                    px: 6,
                    textAlign: align,
                }}
            >
                <Typography variant={'h5'} align={align} sx={{ fontWeight: 600, mb: 2 }}>
                    {title}
                </Typography>
                <Divider
                    sx={{
                        width: '100%',
                        opacity: align === 'center' ? 0 : 1,
                        backgroundColor: Color(BLUIColors.black[200]).alpha(0.36).string(),
                    }}
                />
                <Divider
                    sx={{
                        width: 64,
                        height: 2,
                        backgroundColor: theme.palette.primary.main,
                        m: align === 'center' ? '-1px auto 0' : '-1px 0 0 0',
                    }}
                />
                {children}
            </Box>
        </Box>
    );
};
Section.displayName = 'PageSection';
Section.defaultProps = {
    maxWidth: 1072,
    align: 'left',
    background: 'dark',
};
