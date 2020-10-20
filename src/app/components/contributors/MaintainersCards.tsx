import React from 'react';
import { Card, Typography, makeStyles, Theme, createStyles, useTheme, Avatar, IconButton } from '@material-ui/core';
import { GitHub, LinkedIn } from '@material-ui/icons';
import * as BrandingColors from '@pxblue/colors-branding';

import { currentMaintainers } from '../../../__configuration__/contributors';
import backgroundImage from '../../assets/themes/circles.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'inline-flex',
            flexDirection: 'row',
            margin: `0 -${theme.spacing(2)}px ${theme.spacing()}px`,
            position: 'relative',
            [theme.breakpoints.up('sm')]: {
                margin: `0 0 ${theme.spacing(2)}px`,
            },
        },
        leftStripe: {
            width: theme.spacing(7),
            flex: '0 0 auto',
            [theme.breakpoints.up('md')]: {
                width: theme.spacing(9),
            },
        },
        leftStripeBackground: {
            height: '100%',
            width: '100%',
            backgroundSize: '400%',
            backgroundPosition: 'bottom',
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            margin: `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(3)}px`,
            '& > *': {
                marginBottom: theme.spacing(),
            },
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(5),
            },
        },
        avatar: {
            position: 'absolute',
            top: theme.spacing(3),
            left: theme.spacing(2),
            height: theme.spacing(7),
            width: theme.spacing(7),
            border: `${theme.spacing(0.5)}px solid ${theme.palette.background.paper}`,
            [theme.breakpoints.up('sm')]: {
                height: theme.spacing(8),
                width: theme.spacing(8),
            },
            [theme.breakpoints.up('md')]: {
                height: theme.spacing(9),
                width: theme.spacing(9),
            },
        },
        contactsIcon: {
            marginRight: theme.spacing(2),
        },
        container: {
            [theme.breakpoints.up('sm')]: {
                columns: 2,
            },
        },
    })
);

const getCardBackgroundColor = (index: number): string => {
    const listOfColors = Object.keys(BrandingColors);
    const theme = useTheme();
    // @ts-ignore
    return BrandingColors[listOfColors[index % listOfColors.length]][theme.palette.type === 'light' ? 300 : 800];
};

export const MaintainersCards: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <div className={classes.container}>
            {currentMaintainers
                .sort((a, b) => (a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)) // sort by lastname
                .map((contributor, index) => (
                    <Card className={classes.card} key={index}>
                        <div className={classes.leftStripe} style={{ backgroundColor: getCardBackgroundColor(index) }}>
                            <div
                                className={classes.leftStripeBackground}
                                style={{
                                    backgroundImage: `url('${backgroundImage}')`,
                                }}
                            />
                        </div>
                        <div className={classes.right}>
                            <Typography color={'primary'} variant={'body1'} style={{ fontWeight: 600 }}>
                                {contributor.name}
                            </Typography>
                            <Typography color={'textPrimary'} variant={'body2'}>
                                {contributor.info}
                            </Typography>
                            {contributor.contacts && (
                                <div>
                                    {contributor.contacts.github && (
                                        <IconButton
                                            size={'small'}
                                            href={contributor.contacts.github}
                                            className={classes.contactsIcon}
                                            target={'_blank'}
                                        >
                                            <GitHub htmlColor={theme.palette.text.secondary} />
                                        </IconButton>
                                    )}
                                    {contributor.contacts.linkedIn && (
                                        <IconButton
                                            size={'small'}
                                            href={contributor.contacts.linkedIn}
                                            className={classes.contactsIcon}
                                            target={'_blank'}
                                        >
                                            <LinkedIn htmlColor={theme.palette.text.secondary} />
                                        </IconButton>
                                    )}
                                </div>
                            )}
                        </div>
                        <Avatar src={contributor.image} className={classes.avatar} />
                    </Card>
                ))}
        </div>
    );
};
