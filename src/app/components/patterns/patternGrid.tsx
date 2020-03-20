import React from 'react';
import { Grid, GridProps } from '@material-ui/core';
import { InfoCard } from '../';
import { useHistory } from 'react-router-dom';

type Pattern = {
    title: string;
    url: string;
    description: string;
    image: string;
}
type PatternGridProps = GridProps & {
    patterns: Pattern[];
}
export const PatternGrid: React.FC<PatternGridProps> = (props): JSX.Element => {
    const {patterns, ...gridProps} = props;
    const history = useHistory();
    return (
        <Grid container spacing={6} {...gridProps}>
            {patterns.map((pattern) => (
                <Grid key={pattern.url} item xs={12} sm={6} md={4}>
                    <InfoCard
                        source={pattern.image}
                        onClick={(): void => history.push(pattern.url)}
                        aspectRatio={'3x2'}
                        title={pattern.title}
                        description={pattern.description}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

