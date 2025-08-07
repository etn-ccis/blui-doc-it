import React from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
import { InfoCard } from '..';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    return (
        <Grid container spacing={6} {...gridProps}>
            {links.map((link) => (
                <Grid key={link.url} size={{ xs: 12, sm: 6, md: 4 }}>
                    <InfoCard
                        spacing={6}
                        source={link.image}
                        onClick={(): void => {
                            if (link.url.startsWith('/')) navigate(link.url);
                            else window.open(link.url, '_blank');
                        }}
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
