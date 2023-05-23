import React from 'react';
import { Card, Typography, Theme, useTheme, Avatar, IconButton, SxProps, Box } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import * as BrandingColors from '@brightlayer-ui/colors-branding';

import { currentMaintainers } from '../../../__configuration__/contributors';
import backgroundImage from '../../assets/themes/circles.svg';

const styles: { [key: string]: SxProps<Theme> } = {
    card: {
        display: 'inline-flex',
        flexDirection: 'row',
        mt: 0,
        mx: { xs: 2, sm: 0 },
        mb: { xs: 1, sm: 2 },
        position: 'relative',
    },
    leftStripe: {
        width: { xs: 56, md: 72 },
        flex: '0 0 auto',
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
        mt: 3,
        mr: 2,
        mb: 1,
        ml: { xs: 3, sm: 5 },
        '& > *': {
            mb: 1,
        },
    },
    avatar: {
        position: 'absolute',
        top: 24,
        left: 16,
        height: { xs: 56, sm: 64, md: 72 },
        width: { xs: 56, sm: 64, md: 72 },
        border: `4px solid`,
        borderColor: 'background.paper',
    },
    contactsIcon: {
        mr: 2,
    },
    container: {
        columns: { xs: 1, sm: 2 },
    },
};

const getCardBackgroundColor = (index: number): string => {
    const listOfColors = Object.keys(BrandingColors);
    const theme = useTheme();
    // @ts-ignore
    return BrandingColors[listOfColors[index + (1 % listOfColors.length)]][theme.palette.mode === 'light' ? 300 : 800];
};

export const MaintainersCards: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={styles.container}>
            {currentMaintainers
                .sort((a, b) => (a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)) // sort by lastname
                .map((contributor, index) => (
                    <Card sx={styles.card} key={index}>
                        <Box sx={styles.leftStripe} style={{ backgroundColor: getCardBackgroundColor(index) }}>
                            {' '}
                            {/* adding 2 to the index to mix up the colors. index === 0 isn't returning a color */}
                            <Box
                                sx={{
                                    ...styles.leftStripeBackground,
                                    backgroundImage: `url('${backgroundImage}')`,
                                }}
                            />
                        </Box>
                        <Box sx={styles.right}>
                            <Typography color={'primary'} variant={'body1'} sx={{ fontWeight: 600 }}>
                                {contributor.name}
                            </Typography>
                            <Typography color={'textPrimary'} variant={'body2'}>
                                {contributor.description}
                            </Typography>
                            {contributor.contacts && (
                                <div>
                                    {contributor.contacts.github && (
                                        <IconButton
                                            size={'small'}
                                            href={contributor.contacts.github}
                                            sx={styles.contactsIcon}
                                            target={'_blank'}
                                        >
                                            <GitHub htmlColor={theme.palette.text.secondary} />
                                        </IconButton>
                                    )}
                                    {contributor.contacts.linkedIn && (
                                        <IconButton
                                            size={'small'}
                                            href={contributor.contacts.linkedIn}
                                            sx={styles.contactsIcon}
                                            target={'_blank'}
                                        >
                                            <LinkedIn htmlColor={theme.palette.text.secondary} />
                                        </IconButton>
                                    )}
                                </div>
                            )}
                        </Box>
                        <Avatar src={contributor.image} sx={styles.avatar} />
                    </Card>
                ))}
        </Box>
    );
};
