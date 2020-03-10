import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerNavGroup, DrawerFooter, DrawerHeader, NavItem } from '@pxblue/react-components';
import { Pxblue } from '@pxblue/icons-mui';

import * as Colors from '@pxblue/colors';
import { pageDefinitions, SimpleNavItem } from '../../__configuration__/navigationMenu/navigation';
import { Eaton } from '../assets/icons';

export const NavigationDrawer = (): JSX.Element => {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const history = useHistory();
    const [activeRoute, setActiveRoute] = useState(location.pathname);

    const createNavItems = useCallback((navData: SimpleNavItem[], parentUrl: string, depth: number): NavItem[] => {
        const convertedItems: NavItem[] = [];
        for (let i = 0; i < navData.length; i++) {
            const item = navData[i];
            const fullURL = `${parentUrl}${item.url}`;
            convertedItems.push({
                title: item.title,
                icon: depth === 0 ? item.icon : undefined,
                itemID: fullURL,
                onClick: item.component
                    ? (): void => {
                          history.push(fullURL);
                          setActiveRoute(fullURL);
                      }
                    : undefined,
                items: item.pages ? createNavItems(item.pages, `${parentUrl}${item.url}`, depth + 1) : undefined,
            });
        }
        return convertedItems;
    }, []);

    const [menuItems] = useState(createNavItems(pageDefinitions, '', 0));

    return (
        <Drawer
            open={open}
            width={300}
            ModalProps={{
                onBackdropClick: (): void => setOpen(!open),
            }}
        >
            <DrawerHeader
                title={'Power Xpert Blue'}
                backgroundColor={Colors.blue[500]}
                fontColor={Colors.white[50]}
                icon={<Pxblue />}
                onIconClick={(): void => setOpen(!open)}
            />
            <DrawerBody>
                <DrawerNavGroup hidePadding activeItem={activeRoute} items={menuItems} />
            </DrawerBody>
            <DrawerFooter>
                <div style={{ display: 'flex', justifyContent: 'center', background: Colors.gray[50] }}>
                    <Eaton style={{ fontSize: 92 }} />
                </div>
            </DrawerFooter>
        </Drawer>
    );
};
