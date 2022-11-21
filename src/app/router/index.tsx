import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage } from '../pages';
import { DrawerLayout } from '@brightlayer-ui/react-components';
import { ContactFab, SharedToolbar } from '../components';
import { NavigationDrawer } from './navigationDrawer';
import { AppState } from '../redux/reducers';
import { Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { pageDefinitions, pageRedirects, SimpleNavItem } from '../../__configuration__/navigationMenu/navigation';
import { getScheduledSiteConfig } from '../../__configuration__/themes';
import { AppBar, SxProps, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as Colors from '@brightlayer-ui/colors';
import { AnnouncementAppbar } from '../components/announcements/announcementAppbar';

const buildRoutes = (routes: SimpleNavItem[], url: string): JSX.Element[] => {
    let ret: any[] = [];
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].component) {
            ret.push(
                <Route
                    path={`${url === '' ? '' : `${url}/`}${routes[i].url || ''}`}
                    key={`${url}/${routes[i].url || ''}`}
                    element={routes[i].component}
                />
            );
        }
        if (routes[i].pages) {
            ret = ret.concat(
                buildRoutes(routes[i].pages || [], `${url === '' ? '' : `${url}/`}${routes[i].url || ''}`)
            );
        }
    }
    return ret;
};

const buildRedirects = (): JSX.Element[] => {
    const ret: JSX.Element[] = [];
    for (let i = 0; i < pageRedirects.length; i++) {
        ret.push(
            <Route path={pageRedirects[i].oldUrl} key={i} element={<Navigate replace to={pageRedirects[i].newUrl} />} />
        );
    }
    return ret;
};

const styles: { [key: string]: SxProps<Theme> } = {
    footer: (theme) => ({
        zIndex: 0,
        backgroundColor: Colors.black[900],
        color: Colors.black[50],
        textAlign: 'center',
        marginTop: '50vh',
        transform: 'inherit',
        transition: theme.transitions.create('width'),
    }),
    drawerHeightWithBanner: (theme) => ({
        height: `calc(100% - ${theme.spacing(8)}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100% - ${theme.spacing(7)}px)`,
        },
    }),
};

const ScrollToTop = (): any => {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        // if an anchor link is present, scroll to the anchor link;
        // else scroll the page to the top

        if (hash) {
            const id = hash.replace('#', '');
            const headline = document.getElementById(id);
            if (headline) {
                window.scrollTo(0, headline.offsetTop);
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};

export const MainRouter = (): JSX.Element => {
    const title = useSelector((state: AppState) => state.app.pageTitle);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const toolbarHeight = isMobile ? 104 : 112;
    const className = getScheduledSiteConfig().className;
    const sidebarOpen = useSelector((state: AppState) => state.app.sidebarOpen);
    const showBanner = useSelector((state: AppState) => state.app.showBanner);
    return (
        <Router>
            <ScrollToTop />
            <AnnouncementAppbar />
            <DrawerLayout
                drawer={<NavigationDrawer />}
                className={className}
                // @ts-ignore TODO: Fix types
                sx={{
                    '& .BluiDrawerLayout-drawer': showBanner ? styles.drawerHeightWithBanner : {},
                }}
            >
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route
                        path="*"
                        element={
                            <>
                                <SharedToolbar title={title} navigationIcon={<Menu />} />
                                <div style={{ minHeight: `calc(50vh - ${toolbarHeight}px)` }}>
                                    <Outlet />
                                </div>
                                {/* Footer Section */}
                                <AppBar
                                    position={'static'}
                                    sx={styles.footer}
                                    elevation={0}
                                    style={{ width: `calc(100% - ${sidebarOpen ? 350 : 0}px)` }}
                                >
                                    <Toolbar variant={'dense'}>
                                        <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                                            {`Copyright ${new Date().getFullYear()} Eaton. Licensed under BSD-3-Clause.`}
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </>
                        }
                    >
                        {buildRoutes(pageDefinitions, '')}
                        {buildRedirects()}

                        {/* Catch-All Redirect to Landing Page */}
                        <Route path="*" element={<Navigate replace to={'/'} />} />
                    </Route>
                </Routes>
                <ContactFab />
            </DrawerLayout>
        </Router>
    );
};
