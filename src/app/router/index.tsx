import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Introduction, Color, Typography, Iconography, GettingStarted, LandingPage } from '../pages';
import { DrawerLayout } from '@pxblue/react-components';
import { SharedToolbar } from '../components/SharedToolbar';
import { NavigationDrawer } from './navigationDrawer';
import { AppState } from '../redux/reducers';
//@ts-ignore
import { Pxblue } from '@pxblue/icons-mui';
import { useSelector } from 'react-redux';

export const MainRouter = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const title = useSelector((state: AppState) => state.app.pageTitle);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="*">
                    <DrawerLayout drawer={<NavigationDrawer />}>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <SharedToolbar
                                title={title}
                                navigationIcon={<Pxblue onClick={(): void => setOpen(!open)} />}
                            />
                            <div style={{ padding: 20 }}>
                                <Switch>
                                    {/* Intro Pages */}
                                    <Route exact path="/introduction">
                                        <Introduction />
                                    </Route>
                                    <Route exact path="/getting-started">
                                        <GettingStarted />
                                    </Route>
                                    {/* Style Pages */}
                                    <Route exact path="/style/color">
                                        <Color />
                                    </Route>
                                    <Route exact path="/style/iconography">
                                        <Iconography />
                                    </Route>
                                    <Route exact path="/style/typography">
                                        <Typography />
                                    </Route>
                                    {/* Catch-All Redirect to Home */}
                                    <Route path="*">
                                        <Redirect to={'/'} />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </DrawerLayout>
                </Route>
            </Switch>
        </Router>
    );
};
