import React from 'react';
import { Card, Typography, makeStyles, Theme, createStyles, useTheme, Avatar, IconButton } from '@material-ui/core';
import { GitHub, LinkedIn } from '@material-ui/icons';
import * as BrandingColors from '@pxblue/colors-branding';
import * as PXBColors from '@pxblue/colors';

import { currentMaintainers } from '../../../__configuration__/contributors';
import backgroundImage from '../../assets/circles.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            flexDirection: 'row',
            margin: `${theme.spacing(2)}px 0`,
            maxWidth: 400,
            position: 'relative',
        },
        leftStripe: {
            width: theme.spacing(9),
            flex: '0 0 auto',
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            margin: `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(6)}px`,
            '& > *': {
                marginBottom: theme.spacing(2),
            },
        },
        avatar: {
            position: 'absolute',
            top: theme.spacing(3),
            left: theme.spacing(2),
            height: theme.spacing(9),
            width: theme.spacing(9),
            border: `${theme.spacing(0.5)}px solid ${theme.palette.background.paper}`,
        },
        contactsIcon: {
            marginRight: theme.spacing(2),
        },
    })
);

export const MaintainersCards: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <div>
            {currentMaintainers
                .sort((a, b) => (a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)) // sort by lastname
                .map((contributor, index) => (
                    <Card className={classes.card} key={index}>
                        <div className={classes.leftStripe} style={{ backgroundColor: BrandingColors.crimson[200] }}>
                            <div
                                style={{
                                    backgroundImage: `url('${backgroundImage}')`,
                                    height: '100%',
                                    width: '100%',
                                    backgroundSize: '400%',
                                    backgroundPosition: 'bottom',
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
                                            <GitHub htmlColor={PXBColors.gray[500]} />
                                        </IconButton>
                                    )}
                                    {contributor.contacts.linkedIn && (
                                        <IconButton
                                            size={'small'}
                                            href={contributor.contacts.linkedIn}
                                            className={classes.contactsIcon}
                                            target={'_blank'}
                                        >
                                            <LinkedIn htmlColor={PXBColors.gray[500]} />
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
