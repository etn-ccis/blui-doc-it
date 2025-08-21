import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
    InfoCard,
    Section as LandingSection,
    CarouselCard,
    FooterLinks,
    SharedToolbar,
    ContributorsList,
} from '../components';
import { LatestReleases } from '../../docs';
import * as Colors from '@brightlayer-ui/colors';
import { useNavigate } from 'react-router-dom';

import { cardData } from '../../__configuration__/landingPage/cardData';
import { getScheduledSiteConfig } from '../../__configuration__/themes';
import { Spacer } from '@brightlayer-ui/react-components';
import { ReleaseInfo } from '../../docs/release-notes';
import { currentMaintainers, contributors } from '../../__configuration__/contributors';

import developImage from '../assets/home/develop.jpg';
import designImage from '../assets/home/design.jpg';
import { Design as DesignIcon } from '../assets/icons';
import { usePageTitle } from '../hooks/usePageTitle';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';

import { PXBLogo } from '../assets/icons/PXBLogo';
import { Menu, DeveloperMode } from '@mui/icons-material';
import { useAppSelector, RootState } from '../redux';

const styles: Record<string, SxProps<Theme>> = {
    banner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 8,
        px: 4,
        width: '100%',
        color: 'primary.contrastText',
        backgroundColor: 'primary.main',
        backgroundSize: 'cover',
        backgroundPosition: '-240px center',
    },
    customBannerText: {
        maxWidth: '100%',
        width: 400,
        height: 250,
        display: 'block',
    },
    footer: {
        zIndex: 0,
        backgroundColor: Colors.darkBlack[100],
        color: Colors.white[50],
        textAlign: 'center',
    },
};

export const LandingPage: React.FC = (): React.JSX.Element => {
    const navigate = useNavigate();
    const theme = useTheme();
    const selectedTheme = useAppSelector((state: RootState) => state.app.theme);
    const themeConfig = getScheduledSiteConfig(selectedTheme);
    let landingPageBanner = themeConfig.landingPageBanner;
    const logoColor = themeConfig.logoColor;
    const tagline = themeConfig.landingPageTagline;
    const customBannerText = themeConfig.customBannerText;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    usePageTitle('');
    useGoogleAnalyticsPageView();

    if (isMobile && themeConfig.landingPageBannerMobile) {
        landingPageBanner = themeConfig.landingPageBannerMobile;
    }

    return (
        <>
            <SharedToolbar navigationIcon={<Menu />} />
            <Box sx={styles.banner} style={landingPageBanner}>
                {customBannerText ? (
                    <Box sx={styles.customBannerText} style={customBannerText} />
                ) : (
                    <PXBLogo color={logoColor} tagline={tagline} />
                )}
                <Button
                    variant={'outlined'}
                    color={'inherit'}
                    sx={{ minWidth: 150, fontWeight: 600, mt: 2, mx: 0 }}
                    onClick={(): void => {
                        navigate('overview');
                    }}
                >
                    Get Started
                </Button>
            </Box>
            <LandingSection title={'Design and Development'} align={'left'} background={'light'}>
                <Grid container spacing={6} sx={{ mt: 5 }}>
                    {cardData.map((item, ind) => (
                        <Grid key={`grid${ind}`} size={{ xs: 12, sm: 6, md: 4 }}>
                            <InfoCard
                                spacing={6}
                                source={item.image}
                                title={item.title}
                                aspectRatio={'3x2'}
                                description={item.description}
                                onClick={(): void => {
                                    if (item.path.startsWith('/')) navigate(item.path);
                                    else window.open(item.path, '_blank');
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </LandingSection>
            <LandingSection title={'Latest Updates'} align={'center'} maxWidth={750} background={'dark'}>
                <Typography sx={{ mt: 2, color: 'text.secondary' }}>
                    Get the latest updates on guidelines, components, and documentation across platforms.
                </Typography>
                {LatestReleases.slice(0, 2).map((item: ReleaseInfo) => (
                    <Box key={item.title} sx={{ color: 'text.secondary', textAlign: 'left' }}>
                        <Stack direction={'row'} sx={{ mt: 2 }}>
                            <Typography variant={'h6'} color={'primary'}>
                                {item.date}
                            </Typography>
                            <Spacer />
                        </Stack>
                        <Typography variant={'subtitle2'}>{`v${item.version}`}</Typography>
                        <Typography variant={'subtitle2'}>{item.title}</Typography>
                        {item.summary}
                    </Box>
                ))}
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    sx={{ mt: 1 }}
                    onClick={(): void => navigate('/release-notes')}
                >
                    View All
                </Button>
            </LandingSection>

            {/* Carousel Section */}
            <Grid container>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <CarouselCard
                        backgroundImage={designImage}
                        title={'Getting started as a designer'}
                        description={
                            'We offer many resources and assets for designers getting acquainted with Brightlayer UI.'
                        }
                        icon={<DesignIcon fontSize={'large'} />}
                        onClick={(): void => navigate('/design/intro')}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <CarouselCard
                        backgroundImage={developImage}
                        title={'Getting started as a developer'}
                        description={
                            'We have numerous guides and resources to prepare you for working with Brightlayer UI.'
                        }
                        icon={<DeveloperMode fontSize={'large'} />}
                        onClick={(): void => navigate('/development/environment')}
                    />
                </Grid>
            </Grid>

            <LandingSection title={'Contributors'} background={'light'}>
                <ContributorsList contributors={currentMaintainers} title={'Current Maintainers'} sx={{ my: 4 }} />
                <ContributorsList contributors={contributors} title={'Other Contributors'} sx={{ mt: 4 }} />
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant={'outlined'}
                        color={'primary'}
                        sx={{ mt: 1 }}
                        onClick={(): void => navigate('/community/innersourcing')}
                    >
                        Become a Contributor!
                    </Button>
                </Box>
            </LandingSection>

            {/* Footer Section */}
            <FooterLinks />
            <AppBar position={'static'} sx={styles.footer} elevation={0}>
                <Toolbar variant={'dense'}>
                    <Typography variant={'caption'} align={'center'} sx={{ flex: '1 1 0px' }}>
                        Copyright {new Date().getFullYear()} Eaton. Licensed under BSD-3-Clause.
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};
