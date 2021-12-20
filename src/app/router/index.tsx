import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { LandingPage } from '../pages';
import { DrawerLayout, Spacer } from '@brightlayer-ui/react-components';
import { ContactFab, SharedToolbar } from '../components';
import { NavigationDrawer } from './navigationDrawer';
import { AppState } from '../redux/reducers';
import { Close, Menu } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { pageDefinitions, pageRedirects, SimpleNavItem } from '../../__configuration__/navigationMenu/navigation';
import { getScheduledSiteConfig } from '../../__configuration__/themes';
import {
    AppBar,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import * as Colors from '@brightlayer-ui/colors';
import { HIDE_BANNER } from '../redux/actions';

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
            color: Colors.black[50],
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
    const [navigateBlui, setNavigateBlui] = useState(false);
    const showBanner = useSelector((state: AppState) => state.app.showBanner);
    const sessionStorage = window.sessionStorage;
    const dispatch = useDispatch();

    const getBluiRebrandAppbar = (): JSX.Element => (
        <AppBar position="sticky" color={'secondary'} elevation={0}>
            <Toolbar>
                <div>
                    {'We are now Brightlayer UI! Learn '}
                    <a
                        style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                        onClick={(): any => {
                            setNavigateBlui(true);
                            dispatch({ type: HIDE_BANNER });
                            sessionStorage.setItem('banner-dismissed', 'true');
                        }}
                    >
                        how to migrate
                    </a>
                    .
                </div>
                <Spacer />
                <IconButton
                    style={{ marginRight: -theme.spacing(1) }}
                    color={'inherit'}
                    onClick={(): void => {
                        dispatch({ type: HIDE_BANNER });
                        sessionStorage.setItem('banner-dismissed', 'true');
                    }}
                >
                    <Close />
                </IconButton>
            </Toolbar>
        </AppBar>
    );

    return (
        <Router>
            <ScrollToTop />
            {showBanner && getBluiRebrandAppbar()}
            {navigateBlui && <Redirect to="/brightlayer-ui-package-migration" push />}
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
