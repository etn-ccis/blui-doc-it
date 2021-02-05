import React from 'react';
import { Grid, GridProps } from '@material-ui/core';
import { InfoCard } from '..';
import { useHistory } from 'react-router-dom';

type Link = {
    title: string;
    url: string;
    description: string;
    image: string | JSX.Element;
    background?: {
        size?: string;
        position?: string;
    };
};
type LinkGridProps = GridProps & {
    links: Link[];
};

export const LinkGrid: React.FC<LinkGridProps> = (props): JSX.Element => {
    const { links, ...gridProps } = props;
    const history = useHistory();
    return (
        <Grid container spacing={6} {...gridProps}>
            {links.map((link) => (
                <Grid key={link.url} item xs={12} sm={6} md={4}>
                    <InfoCard
                        spacing={6}
                        source={link.image}
                        onClick={(): void => history.push(link.url)}
                        background={link.background}
                        aspectRatio={'1x1'} // using 1x1 for now until we find better thumbnail pics
                        title={link.title}
                        description={link.description}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
