import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
    Drawer,
    DrawerBody,
    DrawerNavGroup,
    DrawerFooter,
    DrawerHeader,
    NavItem,
} from '@brightlayer-ui/react-components';
import { PxblueSmall } from '@brightlayer-ui/icons-mui';
import { ExpandMore } from '@mui/icons-material';
import color from 'color';
import * as Colors from '@brightlayer-ui/colors';

import { pageDefinitions, SimpleNavItem } from '../../__configuration__/navigationMenu/navigation';
import { EatonTagline } from '../assets/icons';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import { useAppSelector, useAppDispatch, toggleDrawer, RootState } from '../redux';
import { getScheduledSiteConfig } from '../../__configuration__/themes';
import { DRAWER_WIDTH } from '../shared';

export const NavigationDrawer = (): React.JSX.Element => {
    const drawerOpen = useAppSelector((state: RootState) => state.app.drawerOpen);
    const selectedTheme = useAppSelector((state: RootState) => state.app.theme);
    const location = useLocation();
    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState(location.pathname.replace(/^\//, ''));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useAppDispatch();
    const isLandingPage = location.pathname === '/';
    const activeDrawerFade = getScheduledSiteConfig(selectedTheme).drawerActiveBackgroundFade;

    const createNavItems = useCallback(
        (navData: SimpleNavItem[], parentUrl: string, depth: number): NavItem[] => {
            const convertedItems: NavItem[] = [];
            for (const item of navData) {
                if (item.hidden) {
                    continue;
                }
                const fullURL = `${parentUrl === '' ? '' : `${parentUrl}/`}${item.url ?? ''}`;
                const isActiveItem = activeRoute === fullURL;

                convertedItems.push({
                    title: item.title,
                    icon: depth === 0 ? item.icon : undefined,
                    itemID: fullURL,
                    // Custom expand icon with conditional color - blue[200] only for active items
                    expandIcon: item.pages ? (
                        <ExpandMore
                            sx={{
                                color: isActiveItem ? Colors.blue[200] : 'inherit', // Only blue[200] for active items
                            }}
                        />
                    ) : undefined,
                    onClick: item.component
                        ? (): void => {
                              void navigate(fullURL);
                              dispatch(toggleDrawer(false));
                          }
                        : undefined,
                    items: item.pages
                        ? createNavItems(
                              item.pages,
                              `${parentUrl === '' ? '' : `${parentUrl}/`}${item.url ?? ''}`,
                              depth + 1
                          )
                        : undefined,
                });
            }
            return convertedItems;
        },
        [activeRoute, navigate, dispatch]
    );

    const getDrawerNavItemActiveBackgroundColor = useCallback((): string | undefined => {
        if (activeDrawerFade) {
            return color(theme.palette.primary.main).fade(activeDrawerFade).string();
        }
        return undefined;
    }, [theme, activeDrawerFade]);

    useEffect(() => {
        setActiveRoute(location.pathname.replace(/^\//, ''));
    }, [location.pathname]);

    const [menuItems, setMenuItems] = useState(createNavItems(pageDefinitions, '', 0));

    // Update menu items when active route changes to apply conditional colors
    useEffect(() => {
        setMenuItems(createNavItems(pageDefinitions, '', 0));
    }, [activeRoute, createNavItems]);

    return (
        <Drawer
            open={drawerOpen}
            width={DRAWER_WIDTH}
            ModalProps={{
                onClose: (event, reason): void => {
                    if (reason === 'backdropClick') {
                        dispatch(toggleDrawer(!drawerOpen));
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
                        dispatch(toggleDrawer(!drawerOpen));
                    } else {
                        void navigate('/');
                        dispatch(toggleDrawer(false));
                    }
                }}
                titleContent={
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        sx={{ alignSelf: 'stretch', flex: 1, cursor: 'pointer' }}
                        onClick={(): void => {
                            void navigate('/');
                            dispatch(toggleDrawer(false));
                        }}
                    >
                        <Typography>Brightlayer UI</Typography>
                    </Stack>
                }
                sx={{ '& .BluiDrawerHeader-navigation': { ml: 0 }, '&.MuiToolbar-root': { pl: 2 } }}
            />
            <DrawerBody>
                <DrawerNavGroup items={menuItems} />
            </DrawerBody>
            <DrawerFooter>
                <Stack
                    alignItems={'center'}
                    sx={{ backgroundColor: 'background.default', p: 2, cursor: 'pointer' }}
                    onClick={(): void => {
                        window.open('https://eaton.com', 'blank');
                    }}
                >
                    <EatonTagline sx={{ fontSize: 150, height: 48 }} />
                </Stack>
            </DrawerFooter>
        </Drawer>
    );
};
