import React from 'react';
import { createStyles, Grid, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import { InfoCard } from '..';
import { componentCatalogLinks } from '../../../__configuration__/resources';

type CatalogStorybookLinkProp = {
    name: 'Angular' | 'React' | 'React Native';
    content: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        enabledLinks: {
            textDecoration: 'underline',
            color: theme.palette.text.primary,
        },
        disabledLinks: {
            color: theme.palette.text.disabled,
            textDecoration: `line-through ${theme.palette.text.disabled}`,
        },
        descriptionContent: {
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(2),
        },
    })
);

const CatalogStorybookLink: React.FC<CatalogStorybookLinkProp> = (props) => {
    const { name, content } = props;
    const classes = useStyles();
    if (content.startsWith('http')) {
        return (
            <a href={content}>
                <Typography className={classes.enabledLinks}>{name}</Typography>
            </a>
        );
    }
    return (
        <Tooltip title={content}>
            <Typography className={classes.disabledLinks}>{name}</Typography>
        </Tooltip>
    );
};

export const ComponentCatalogGrids: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={6} style={{ marginTop: 32 }}>
            {componentCatalogLinks.map((link) => (
                <Grid item xs={12} sm={6} md={4} key={link.title}>
                    <InfoCard
                        spacing={6}
                        source={link.image}
                        aspectRatio={'3x2'}
                        title={link.title}
                        description={''}
                        descriptionContent={
                            <div className={classes.descriptionContent}>
                                <CatalogStorybookLink name="Angular" content={link.angular} />
                                <CatalogStorybookLink name="React" content={link.react} />
                                <CatalogStorybookLink name="React Native" content={link.reactNative} />
                            </div>
                        }
                    />
                </Grid>
            ))}
        </Grid>
    );
};
