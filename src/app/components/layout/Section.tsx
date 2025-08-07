import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box, { BoxProps } from '@mui/material/Box';

type SectionProps = BoxProps & {
    title: string;
    align?: 'left' | 'center';
    maxWidth?: number;
    background?: 'light' | 'dark';
};
export const Section: React.FC<SectionProps> = (props) => {
    const { title, align='left', maxWidth='1072', background='dark', sx, children, ...boxProps } = props;
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
                <Divider sx={{ width: '100%', opacity: align === 'center' ? 0 : 1 }} />
                <Divider
                    sx={{
                        width: 64,
                        height: 2,
                        backgroundColor: 'primary.main',
                        m: align === 'center' ? '-1px auto 0' : '-1px 0 0 0',
                    }}
                />
                {children}
            </Box>
        </Box>
    );
};
Section.displayName = 'PageSection';
// Section.defaultProps = {
//     maxWidth: 1072,
//     align: 'left',
//     background: 'dark',
// };
