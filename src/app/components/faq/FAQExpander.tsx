import {
    Accordion,
    AccordionDetails,
    AccordionProps,
    AccordionSummary,
    createStyles,
    makeStyles,
    Typography,
    Theme,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        summary: {
            padding: `0 ${theme.spacing(2)}px`,
            margin: 0,
        },
        details: {
            display: 'block',
            padding: theme.spacing(2),
        },
    })
);

type FAQProps = AccordionProps & {
    question: string;
};
export const FAQExpander: React.FC<FAQProps> = (props) => {
    const { question, ...accordionProps } = props;
    const classes = useStyles();

    return (
        <Accordion {...accordionProps}>
            <AccordionSummary expandIcon={<ExpandMore color={'primary'} />} className={classes.summary}>
                <Typography variant={'body1'} color={'primary'} style={{ fontWeight: 600 }}>
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>{props.children}</AccordionDetails>
        </Accordion>
    );
};
