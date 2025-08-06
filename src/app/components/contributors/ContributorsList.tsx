import React from 'react';
import { ContributorsCard } from './';
import { CurrentMaintainter } from '../../../__types__';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type ContributorListProps = BoxProps & {
    contributors: CurrentMaintainter[];
    title?: string;
};

export const ContributorsList: React.FC<ContributorListProps> = (props) => {
    const { contributors, title, ...boxProps } = props;
    return (
        <Box {...boxProps}>
            {title && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant={'overline'}>{title}</Typography>
                </Box>
            )}
            <Grid container spacing={2}>
                {contributors
                    .sort((a, b) => (a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)) // sort by lastname
                    .map((contributor, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}  key={index}>
                            <ContributorsCard {...contributor} />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

ContributorsList.displayName = 'ContributorsList';
