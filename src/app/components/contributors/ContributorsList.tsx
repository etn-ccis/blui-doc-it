import React, { HTMLAttributes } from 'react';
import { ContributorsCard } from './';
import { Contributor } from '../../../__types__';
import { Grid, Typography, useTheme } from '@material-ui/core';

type ContributorListProps = HTMLAttributes<HTMLDivElement> & {
    contributors: Contributor[];
    title?: string;
};

export const ContributorsList: React.FC<ContributorListProps> = (props) => {
    const theme = useTheme();
    return (
        <div style={props.style}>
            {props.title && (
                <div style={{ marginBottom: theme.spacing(2) }}>
                    <Typography variant={'overline'}>{props.title}</Typography>
                </div>
            )}
            <Grid container spacing={2}>
                {props.contributors
                    .sort((a, b) => (a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)) // sort by lastname
                    .map((contributor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ContributorsCard {...contributor} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

ContributorsList.displayName = 'ContributorsList';
