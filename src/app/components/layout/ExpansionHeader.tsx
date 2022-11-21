import React from 'react';
import { Typography, Theme, AccordionSummary, SxProps, Box } from '@mui/material';

import { ExpandMore } from '@mui/icons-material';

const styles: { [key: string]: SxProps<Theme> } = {
    expanderHeader: {
        flex: '1 1 0px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        overflow: 'hidden',
        py: { xs: 1, sm: 0 },
    },
    expanderSubtitle: {
        fontWeight: 300,
        fontSize: '0.875rem',
    },
    expanderTitle: {
        fontWeight: 600,
        flex: '0 0 auto',
        marginRight: 4,
        fontSize: '0.875rem',
    },
    noMargin: {
        overflow: 'hidden',
        m: '0 !important',
        // TODO: Fix this style
        '&$expanded': {
            minHeight: 48,
        },
    },
    expanded: {},
};

type ExpansionHeaderProps = {
    name: string;
    description: string;
};
export const ExpansionHeader: React.FC<ExpansionHeaderProps> = (props): JSX.Element => (
    // @ts-ignore TODO: Fix this style merging
    <AccordionSummary
        expandIcon={<ExpandMore color={'primary'} />}
        style={{ padding: '0 16px', margin: 0 }}
        sx={{
            ...styles.noMargin,
            '& .MuiAccordionSummary-content': {
                ...styles.noMargin,
            },
            '&.Mui-expanded': {
                ...styles.noMargin,
            },
        }}
    >
        <Box sx={styles.expanderHeader}>
            <Typography
                variant={'subtitle1'}
                noWrap
                color={'primary'}
                sx={styles.expanderTitle}
            >{`${props.name}: `}</Typography>
            <Typography color={'primary'} sx={styles.expanderSubtitle}>{`${props.description}`}</Typography>
        </Box>
    </AccordionSummary>
);
