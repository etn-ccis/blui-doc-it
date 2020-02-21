import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LandingPage } from '../pages';
import { DrawerLayout } from '@pxblue/react-components';
import { SharedToolbar } from '../components/SharedToolbar';
import { NavigationDrawer } from './navigationDrawer';
import { AppState } from '../redux/reducers';
//@ts-ignore
import { Pxblue } from '@pxblue/icons-mui';
import { useSelector } from 'react-redux';

import { pageDefinitions } from '../../__configuration__/navigationMenu/navigation';

const buildRoutes = (routes: any[], url: string): JSX.Element[] => {
    let ret: any[] = [];
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].component) {
            ret.push(
                <Route exact path={`${url}${routes[i].url}`} key={`${url}/${routes[i].url}`}>
                    {routes[i].component}
                </Route>
            );
        }
        if (routes[i].pages) {
            ret = ret.concat(buildRoutes(routes[i].pages, `${url}${routes[i].url}`));
        }
    }
    return ret;
};

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
                                    {buildRoutes(pageDefinitions, '')}

                                    {/* Catch-All Redirect to Landing Page */}
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
