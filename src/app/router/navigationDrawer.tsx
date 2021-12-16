import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    Drawer,
    DrawerBody,
    DrawerNavGroup,
    DrawerFooter,
    DrawerHeader,
    NavItem,
} from '@brightlayer-ui/react-components';
import { PxblueSmall } from '@brightlayer-ui/icons-mui';
import color from 'color';

import { pageDefinitions, SimpleNavItem } from '../../__configuration__/navigationMenu/navigation';
import { EatonTagline } from '../assets/icons';
import { Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { TOGGLE_DRAWER } from '../redux/actions';
import { getScheduledSiteConfig } from '../../__configuration__/themes';
import { DRAWER_WIDTH } from '../shared';

export const NavigationDrawer = (): JSX.Element => {
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const location = useLocation();
    const history = useHistory();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const isLandingPage = history.location.pathname === '/';
    const activeDrawerFade = getScheduledSiteConfig().drawerActiveBackgroundFade;

    const createNavItems = useCallback((navData: SimpleNavItem[], parentUrl: string, depth: number): NavItem[] => {
        const convertedItems: NavItem[] = [];
        for (let i = 0; i < navData.length; i++) {
            const item = navData[i];
            if (item.hidden) {
                continue;
            }
            const fullURL = `${parentUrl}${item.url || ''}`;
            convertedItems.push({
                title: item.title,
                icon: depth === 0 ? item.icon : undefined,
                itemID: fullURL,
                // To add a on hover effect to the ExpandMore chevron for NavItems
                // with sub pages and a landing page (e.g., Design Patterns)
                //
                // expandIcon:
                //     item.pages && item.component ? (
                //         <IconButton>
                //             <ExpandMore />
                //         </IconButton>
                //     ) : (
                //         undefined
                //     ),
                onClick: item.component
                    ? (): void => {
                          history.push(fullURL);
                          dispatch({ type: TOGGLE_DRAWER, payload: false });
                      }
                    : undefined,
                items: item.pages ? createNavItems(item.pages, `${parentUrl}${item.url || ''}`, depth + 1) : undefined,
            });
        }
        return convertedItems;
    }, []);

    const getDrawerNavItemActiveBackgroundColor = useCallback((): string | undefined => {
        if (activeDrawerFade) {
            return color(theme.palette.primary.main).fade(activeDrawerFade).string();
        }
        return undefined;
    }, [theme, activeDrawerFade]);

    useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location.pathname]);

    const [menuItems] = useState(createNavItems(pageDefinitions, '', 0));

    return (
        <Drawer
            open={drawerOpen}
            width={DRAWER_WIDTH}
            ModalProps={{
                onClose: (event, reason): void => {
                    if (reason === 'backdropClick') {
                        dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                    }
                },
            }}
            variant={isMobile || isLandingPage ? 'temporary' : 'permanent'}
            activeItemBackgroundColor={getDrawerNavItemActiveBackgroundColor()}
            itemFontColor={theme.palette.text.primary}
            divider={false}
            activeItem={activeRoute}
            activeItemFontColor={theme.palette.primary.main}
            hidePadding
            activeItemBackgroundShape={'round'}
        >
            <DrawerHeader
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
                        <Typography>Brightlayer UI</Typography>
                    </div>
                }
            />
            <DrawerBody>
                <DrawerNavGroup items={menuItems} />
            </DrawerBody>
            <DrawerFooter>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        background: theme.palette.background.default,
                        padding: 16,
                        cursor: 'pointer',
                    }}
                    onClick={(): void => {
                        window.open('https://eaton.com', 'blank');
                    }}
                >
                    <EatonTagline style={{ fontSize: 150, height: 48 }} />
                </div>
            </DrawerFooter>
        </Drawer>
    );
};
