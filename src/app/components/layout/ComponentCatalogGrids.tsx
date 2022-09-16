import React from 'react';
import { createStyles, Grid, makeStyles, Theme, Tooltip, Chip } from '@material-ui/core';
import { InfoCard } from '..';
import { componentCatalogLinks } from '../../../__configuration__/resources';
import { Angular, ReactBlue } from '../../assets/icons';

type CatalogStorybookLinkProp = {
    name: 'Angular' | 'React' | 'React Native';
    content: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        descriptionContent: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing(),
        },
    })
);

const CatalogStorybookLink: React.FC<CatalogStorybookLinkProp> = (props) => {
    const { name, content } = props;
    if (content.startsWith('http')) {
        return (
            <Chip
                label={name}
                avatar={
                    name === 'Angular' ? (
                        <Angular style={{ backgroundColor: 'transparent' }} />
                    ) : (
                        <ReactBlue style={{ backgroundColor: 'transparent' }} />
                    )
                }
                onClick={(): void => {
                    window.open(content, '_blank');
                }}
            />
        );
    }
    return (
        <Tooltip title={content} placement={'top'} arrow>
            <div>
                <Chip
                    disabled
                    label={name}
                    variant={'outlined'}
                    avatar={
                        name === 'Angular' ? (
                            <Angular style={{ backgroundColor: 'transparent', filter: 'grayscale(100%)' }} />
                        ) : (
                            <ReactBlue style={{ backgroundColor: 'transparent', filter: 'grayscale(100%)' }} />
                        )
                    }
                />
            </div>
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
