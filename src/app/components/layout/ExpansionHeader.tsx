import React from 'react';
import { Typography, Theme, createStyles, makeStyles, AccordionSummary } from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expanderHeader: {
            flex: '1 1 0px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                padding: `${theme.spacing(1)}px 0`,
            },
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
            margin: '0 !important',
            '&$expanded': {
                minHeight: theme.spacing(6),
            },
        },
        expanded: {},
    })
);

type ExpansionHeaderProps = {
    name: string;
    description: string;
};
export const ExpansionHeader: React.FC<ExpansionHeaderProps> = (props): JSX.Element => {
    const classes = useStyles();

    return (
        <AccordionSummary
            expandIcon={<ExpandMore color={'primary'} />}
            style={{ padding: '0 16px', margin: 0 }}
            classes={{
                root: classes.noMargin,
                content: classes.noMargin,
                expanded: classes.expanded,
            }}
        >
            <div className={classes.expanderHeader}>
                <Typography
                    variant={'subtitle1'}
                    noWrap
                    color={'primary'}
                    className={classes.expanderTitle}
                >{`${props.name}: `}</Typography>
                <Typography color={'primary'} className={classes.expanderSubtitle}>{`${props.description}`}</Typography>
            </div>
        </AccordionSummary>
    );
};
