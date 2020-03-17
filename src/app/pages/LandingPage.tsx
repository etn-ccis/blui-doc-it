import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    // Hidden,
    Button,
    Grid,
    Theme,
    // Tabs,
    // Tab,
    useTheme,
    createStyles,
    makeStyles,
} from '@material-ui/core';
import {
    PXBLogo,
    InfoCard,
    Section as LandingSection,
    CardCarousel,
    CarouselCard,
    // NavLink,
    FooterLinks,
    SharedToolbar,
} from '../components';
import { LatestReleases } from '../../docs';

//@ts-ignore
// import { PxblueSmall } from '@pxblue/icons-mui';
import * as Colors from '@pxblue/colors';
import circles from '../assets/circles.svg';
import { useHistory } from 'react-router-dom';

import { cardData } from '../../__configuration__/landingPage/cardData';
import { Spacer } from '@pxblue/react-components';
import { ReleaseInfo } from '../../docs/release-notes';

import computer from '../assets/placeholder/develop.jpg';
import paper from '../assets/placeholder/paper.jpg';
import { usePageTitle } from '../hooks/usePageTitle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        banner: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // marginTop: theme.spacing(8),
            padding: `${theme.spacing(8)}px ${theme.spacing(4)}px`,
            width: '100%',
            color: '#ffffff',
            backgroundColor: Colors.blue[500],
            backgroundImage: `url(${circles})`,
            backgroundSize: 1200,
            backgroundPosition: '-240px center',
            [theme.breakpoints.down('xs')]: {
                // marginTop: theme.spacing(7)
            },
        },
        footer: {
            zIndex: 0,
            backgroundColor: Colors.black[900],
            textAlign: 'center',
            // position: 'absolute',
            // bottom: 0,
        },
    })
);

export const LandingPage: React.FC = (): JSX.Element => {
    const history = useHistory();
    const theme = useTheme();
    const classes = useStyles();
    usePageTitle('');

    return (
        <>
            <SharedToolbar />
            <div className={classes.banner}>
                <PXBLogo />
                <Button
                    variant={'outlined'}
                    color={'inherit'}
                    style={{ minWidth: 150, fontWeight: 600, margin: `${theme.spacing(2)}px 0 0` }}
                    onClick={(): void => {
                        history.push('overview');
                    }}
                >
                    GET STARTED
                </Button>
            </div>
            <LandingSection title={'Guidance'} align={'left'} background={'light'}>
                <Grid container spacing={6} style={{ marginTop: theme.spacing(2) }}>
                    {cardData.map((item, ind) => (
                        <Grid key={`grid${ind}`} item xs={12} sm={6} md={4}>
                            <InfoCard
                                source={item.image}
                                title={item.title}
                                description={item.description}
                                onClick={(): void => {
                                    if (item.path.startsWith('/')) history.push(item.path);
                                    else window.open(item.path, '_blank');
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </LandingSection>
            <LandingSection title={'Latest Updates'} align={'center'} maxWidth={750} background={'dark'}>
                <Typography style={{ marginTop: theme.spacing(2), color: Colors.gray[500] }}>
                    Get the latest updates on guidelines, components, and documentation across platforms.
                </Typography>
                {LatestReleases.slice(0, 2).map((item: ReleaseInfo) => (
                    <div key={item.title} style={{ color: Colors.gray[500], textAlign: 'left' }}>
                        <div style={{ marginTop: theme.spacing(2), display: 'flex' }}>
                            <Typography variant={'h6'} color={'primary'}>
                                {item.title}
                            </Typography>
                            <Spacer />
                            <Typography color={'inherit'}>{item.date}</Typography>
                        </div>
                        <Typography variant={'subtitle2'}>{`v${item.version}`}</Typography>
                        {item.summary}
                    </div>
                ))}
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    style={{ marginTop: theme.spacing(1) }}
                    onClick={(): void => history.push('/release-notes')}
                >
                    VIEW ALL
                </Button>
            </LandingSection>

            {/* Carousel Section */}
            <CardCarousel>
                <CarouselCard
                    backgroundImage={paper}
                    title={'Getting started as a designer'}
                    description={
                        'We offer asset library on Sketch and Figma, with all the icons, fonts, colors and components.'
                    }
                    onClick={(): void => history.push('/style/color')}
                />
                <CarouselCard
                    backgroundImage={computer}
                    title={'Getting started as a developer'}
                    description={
                        'We offer asset library on Sketch and Figma, with all the icons, fonts, colors and components.'
                    }
                    onClick={(): void => history.push('/development/environment')}
                />
            </CardCarousel>

            {/* Footer Section */}
            <FooterLinks />
            <AppBar position={'static'} className={classes.footer} elevation={0}>
                <Toolbar variant={'dense'}>
                    <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                        Copyright 2020 Eaton. Licensed under BSD-3-Clause.
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};
