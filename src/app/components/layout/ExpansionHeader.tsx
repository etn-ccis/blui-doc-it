import React from 'react';
import { Typography, AccordionSummary, Box } from '@mui/material';

import { ExpandMore } from '@mui/icons-material';

type ExpansionHeaderProps = {
    name: string;
    description: string;
};
export const ExpansionHeader: React.FC<ExpansionHeaderProps> = (props): JSX.Element => (
    <AccordionSummary
        expandIcon={<ExpandMore color={'primary'} />}
        sx={{
            overflow: 'hidden',
            m: 0,
            px: 2,
            height: 48,
            '& .MuiAccordionSummary-content': {
                overflow: 'hidden',
                m: 0,
            },
            '&.Mui-expanded': {
                minHeight: 48,
                height: 48,
            },
        }}
    >
        <Box
            sx={{
                flex: '1 1 0px',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                overflow: 'hidden',
                py: { xs: 1, sm: 0 },
            }}
        >
            <Typography
                variant={'subtitle1'}
                noWrap
                color={'primary'}
                sx={{
                    fontWeight: 600,
                    flex: '0 0 auto',
                    mr: 0.5,
                    fontSize: '0.875rem',
                }}
            >{`${props.name}: `}</Typography>
            <Typography
                color={'primary'}
                sx={{
                    fontWeight: 300,
                    fontSize: '0.875rem',
                }}
            >{`${props.description}`}</Typography>
        </Box>
    </AccordionSummary>
);
