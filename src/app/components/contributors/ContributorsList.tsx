import React from 'react';
import { ContributorsCard, Contributor } from './';
import { Grid, Typography } from '@material-ui/core';

type ContributorListProps = {
    contributors: Contributor[];
    title?: string;
};

export const ContributorsList: React.FC<ContributorListProps> = (props) => (
    <>
        {props.title && (
            <div style={{ marginBottom: 16 }}>
                <Typography variant={'overline'}>{props.title}</Typography>
            </div>
        )}
        <Grid container spacing={2}>
            {props.contributors
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((contributor, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ContributorsCard {...contributor} />
                    </Grid>
                ))}
        </Grid>
    </>
);
ContributorsList.displayName = 'ContributorsList';
