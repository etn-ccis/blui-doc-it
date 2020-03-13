import React from 'react';
import { useMediaQuery, Typography, makeStyles, createStyles } from '@material-ui/core';

import { ResourceRow } from './ResourceRow';
import { ButtonRow } from './ButtonRow';

const useStyles = makeStyles(() =>
    createStyles({
        flex: {
            display: 'flex',
            alignItems: 'center',
        },
        title: {
            fontWeight: 600,
            lineHeight: 1.2,
            fontSize: '0.875rem',
        },
    })
);

type ExampleRowProps = {
    name: string;
    description: string;
    divider?: boolean;
    repository: string;
    bugLabels?: string[];
    branches?: string[];
};
export const ExampleRow: React.FC<ExampleRowProps> = (props): JSX.Element => {
    const { branches } = props;
    const small = useMediaQuery('(max-width:799px)');
    const classes = useStyles();

    const buttons = (
        <ButtonRow
            small={small}
            repository={props.repository}
            branches={!branches || branches.includes('all') ? ['angular', 'react', 'ionic', 'reactnative'] : branches}
            bugLabels={props.bugLabels}
        />
    );

    return (
        <ResourceRow
            title={
                <div className={classes.flex} style={{ width: small ? '100%' : 'auto' }}>
                    <Typography className={classes.title} noWrap>
                        {props.name}
                    </Typography>
                    {small && buttons}
                </div>
            }
            description={props.description}
            repository={props.repository}
            divider={props.divider}
            rightComponent={small ? undefined : buttons}
        />
    );
};
ExampleRow.displayName = 'ExampleRow';
