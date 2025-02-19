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
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as Colors from '@brightlayer-ui/colors';
import { AnnouncementAppbar } from '../components/announcements/announcementAppbar';
import { SystemStyleObject } from '@mui/system';

const buildRoutes = (routes: SimpleNavItem[], url: string): JSX.Element[] => {
    let ret: any[] = [];
    for (const route of routes) {
        if (route.component) {
            ret.push(
                <Route
                    path={`${url === '' ? '' : `${url}/`}${route.url ?? ''}`}
                    key={`${url}/${route.url ?? ''}`}
                    element={route.component}
                />
            );
        }
        if (route.pages) {
            ret = ret.concat(buildRoutes(route.pages || [], `${url === '' ? '' : `${url}/`}${route.url ?? ''}`));
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
    const selectedTheme = useSelector((state: AppState) => state.app.theme);
    const className = getScheduledSiteConfig(selectedTheme).className;
    const sidebarOpen = useSelector((state: AppState) => state.app.sidebarOpen);
    const showBanner = useSelector((state: AppState) => state.app.showBanner);
    return (
        <Router>
            <ScrollToTop />
            <AnnouncementAppbar />
            <DrawerLayout
                drawer={<NavigationDrawer />}
                className={className}
                sx={(theme): SystemStyleObject => ({
                    display: 'block',
                    '& .BluiDrawerLayout-drawer': {
                        height: showBanner
                            ? { xs: `calc(100% - ${theme.spacing(7)}px)`, sm: `calc(100% - ${theme.spacing(8)}px)` }
                            : undefined,
                        zIndex: 'modal',
                    },
                })}
            >
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route
                        path="*"
                        element={
                            <>
                                <SharedToolbar title={title} navigationIcon={<Menu />} />
                                <Box sx={{ minHeight: { xs: `calc(50vh - ${104}px)`, sm: `calc(50vh - ${112}px)` } }}>
                                    <Outlet />
                                </Box>
                                {/* Footer Section */}
                                <AppBar
                                    position={'static'}
                                    sx={(theme): SystemStyleObject => ({
                                        zIndex: 0,
                                        backgroundColor: Colors.black[900],
                                        color: Colors.black[50],
                                        textAlign: 'center',
                                        mt: '50vh',
                                        transform: 'inherit',
                                        transition: theme.transitions.create('width'),
                                    })}
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
