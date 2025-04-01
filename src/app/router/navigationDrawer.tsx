import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { TOGGLE_DRAWER } from '../redux/actions';
import { getScheduledSiteConfig } from '../../__configuration__/themes';
import { DRAWER_WIDTH } from '../shared';

export const NavigationDrawer = (): JSX.Element => {
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const selectedTheme = useSelector((state: AppState) => state.app.theme);
    const location = useLocation();
    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState(location.pathname.replace(/^\//, ''));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const isLandingPage = location.pathname === '/';
    const activeDrawerFade = getScheduledSiteConfig(selectedTheme).drawerActiveBackgroundFade;

    const createNavItems = useCallback((navData: SimpleNavItem[], parentUrl: string, depth: number): NavItem[] => {
        const convertedItems: NavItem[] = [];
        for (const item of navData) {
            if (item.hidden) {
                continue;
            }
            const fullURL = `${parentUrl === '' ? '' : `${parentUrl}/`}${item.url ?? ''}`;
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
                          void navigate(fullURL);
                          dispatch({ type: TOGGLE_DRAWER, payload: false });
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
    }, []);

    const getDrawerNavItemActiveBackgroundColor = useCallback((): string | undefined => {
        if (activeDrawerFade) {
            return color(theme.palette.primary.main).fade(activeDrawerFade).string();
        }
        return undefined;
    }, [theme, activeDrawerFade]);

    useEffect(() => {
        setActiveRoute(location.pathname.replace(/^\//, ''));
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
                        void navigate('/');
                        dispatch({ type: TOGGLE_DRAWER, payload: false });
                    }
                }}
                titleContent={
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        sx={{ alignSelf: 'stretch', flex: 1, cursor: 'pointer' }}
                        onClick={(): void => {
                            void navigate('/');
                            dispatch({ type: TOGGLE_DRAWER, payload: false });
                        }}
                    >
                        <Typography>Brightlayer UI</Typography>
                    </Stack>
                }
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
