import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { LandingPage } from '../pages';
import { DrawerLayout } from '@pxblue/react-components';
import { SharedToolbar, ContactFab } from '../components';
import { NavigationDrawer } from './navigationDrawer';
import { AppState } from '../redux/reducers';
import { Menu } from '@material-ui/icons';
import { useSelector } from 'react-redux';

import { pageDefinitions, SimpleNavItem, pageRedirects } from '../../__configuration__/navigationMenu/navigation';
import { getScheduledSiteConfig } from '../../__configuration__/themes';
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    createStyles,
    useTheme,
    useMediaQuery,
    Theme,
} from '@material-ui/core';
import * as Colors from '@pxblue/colors';

const buildRoutes = (routes: SimpleNavItem[], url: string): JSX.Element[] => {
    let ret: any[] = [];
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].component) {
            ret.push(
                <Route exact path={`${url}${routes[i].url || ''}`} key={`${url}/${routes[i].url || ''}`}>
                    {routes[i].component}
                </Route>
            );
        }
        if (routes[i].pages) {
            ret = ret.concat(buildRoutes(routes[i].pages || [], `${url}${routes[i].url || ''}`));
        }
    }
    return ret;
};

const buildRedirects = (): JSX.Element[] => {
    const ret: JSX.Element[] = [];
    for (let i = 0; i < pageRedirects.length; i++) {
        ret.push(<Redirect exact from={pageRedirects[i].oldUrl} to={pageRedirects[i].newUrl} key={i} />);
    }
    return ret;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            zIndex: 0,
            backgroundColor: Colors.black[900],
            textAlign: 'center',
            marginTop: '50vh',
            transform: 'inherit',
            transition: theme.transitions.create('width'),
        },
    })
);

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
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const toolbarHeight = isMobile ? 104 : 112;
    const className = getScheduledSiteConfig().className;
    const sidebarOpen = useSelector((state: AppState) => state.app.sidebarOpen);

    return (
        <Router>
            <ScrollToTop />

            <DrawerLayout drawer={<NavigationDrawer />} className={className}>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route path="*">
                        <>
                            <SharedToolbar title={title} navigationIcon={<Menu />} />
                            <div style={{ minHeight: `calc(50vh - ${toolbarHeight}px)` }}>
                                <Switch>
                                    {buildRoutes(pageDefinitions, '')}
                                    {buildRedirects()}

                                    {/* Catch-All Redirect to Landing Page */}
                                    <Route path="*">
                                        <Redirect to={'/'} />
                                    </Route>
                                </Switch>
                            </div>
                            {/* Footer Section */}
                            <AppBar
                                position={'static'}
                                className={classes.footer}
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
                    </Route>
                </Switch>
                <ContactFab />
            </DrawerLayout>
        </Router>
    );
};
