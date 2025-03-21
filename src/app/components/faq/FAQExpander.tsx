import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Theme, SxProps } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import React from 'react';

const styles: Record<string, SxProps<Theme>> = {
    summary: {
        py: 0,
        px: 2,
        m: 0,
    },
    details: {
        display: 'block',
        p: 2,
    },
};

type FAQProps = AccordionProps & {
    question: string;
};
export const FAQExpander: React.FC<FAQProps> = (props) => {
    const { question, ...accordionProps } = props;

    return (
        <Accordion {...accordionProps}>
            <AccordionSummary expandIcon={<ExpandMore color={'primary'} />} sx={styles.summary}>
                <Typography variant={'body1'} color={'primary'} style={{ fontWeight: 600 }}>
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={styles.details}>{props.children}</AccordionDetails>
        </Accordion>
    );
};
