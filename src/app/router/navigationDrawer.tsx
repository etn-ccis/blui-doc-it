import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerNavGroup, DrawerFooter, DrawerHeader, NavItem } from '@pxblue/react-components';
import { PxblueSmall } from '@pxblue/icons-mui';

import * as Colors from '@pxblue/colors';
import { pageDefinitions, SimpleNavItem } from '../../__configuration__/navigationMenu/navigation';
import { EatonTagline } from '../assets/icons';
import { Typography, useTheme, useMediaQuery, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { TOGGLE_DRAWER } from '../redux/actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        shadow: {
            boxShadow: theme.shadows[6],
        },
    })
);

// these page will not appear in the nav drawer, but still get the routing
const ignoredPage = new Set([
    'Design Anatomy',
]);

export const NavigationDrawer = (): JSX.Element => {
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const isLandingPage = history.location.pathname === '/';

    const createNavItems = useCallback((navData: SimpleNavItem[], parentUrl: string, depth: number): NavItem[] => {
        const convertedItems: NavItem[] = [];
        for (let i = 0; i < navData.length; i++) {
            const item = navData[i];
            if(ignoredPage.has(item.title)) {
                continue;
            }
            const fullURL = `${parentUrl}${item.url}`;
            convertedItems.push({
                title: item.title,
                icon: depth === 0 ? item.icon : undefined,
                itemID: fullURL,
                onClick: item.component
                    ? (): void => {
                          history.push(fullURL);
                          dispatch({ type: TOGGLE_DRAWER, payload: false });
                      }
                    : undefined,
                items: item.pages ? createNavItems(item.pages, `${parentUrl}${item.url}`, depth + 1) : undefined,
            });
        }
        return convertedItems;
    }, []);

    useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location.pathname]);

    const [menuItems] = useState(createNavItems(pageDefinitions, '', 0));

    return (
        <Drawer
            open={drawerOpen}
            width={270}
            ModalProps={{
                onBackdropClick: (): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                },
            }}
            style={{ boxShadow: theme.shadows[12] }}
            className={!isMobile && !isLandingPage ? classes.shadow : undefined}
            variant={isMobile || isLandingPage ? 'temporary' : 'permanent'}
        >
            <DrawerHeader
                backgroundColor={Colors.blue[500]}
                fontColor={Colors.white[50]}
                icon={<PxblueSmall />}
                onIconClick={(): void => {
                    if (isMobile) {
                        dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                    } else {
                        history.push('/');
                        dispatch({ type: TOGGLE_DRAWER, payload: false });
                    }
                }}
                titleContent={
                    <div
                        style={{
                            alignSelf: 'stretch',
                            flex: '1 1 0px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={(): void => {
                            history.push('/');
                            dispatch({ type: TOGGLE_DRAWER, payload: false });
                        }}
                    >
                        <Typography>
                            Power Xpert <b>Blue</b>
                        </Typography>
                    </div>
                }
            />
            <DrawerBody>
                <DrawerNavGroup hidePadding activeItem={activeRoute} items={menuItems} />
            </DrawerBody>
            <DrawerFooter>
                <div style={{ display: 'flex', justifyContent: 'center', background: Colors.gray[50], padding: 16 }}>
                    <EatonTagline style={{ fontSize: 150, height: 48 }} />
                </div>
            </DrawerFooter>
        </Drawer>
    );
};
