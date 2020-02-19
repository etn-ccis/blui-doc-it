import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerNavGroup, DrawerFooter, DrawerHeader, NavItem } from '@pxblue/react-components';

//@ts-ignore
import { Pxblue } from '@pxblue/icons-mui';
import { Info } from '@material-ui/icons';

import * as Colors from '@pxblue/colors';
import { navigationData } from '../../__configuration__/navigationMenu/navigation';

export const NavigationDrawer = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const location = useLocation();

    return (
        <Drawer
            open={open}
            width={380}
            ModalProps={{
                onBackdropClick: (): void => setOpen(!open),
            }}
        >
            <DrawerHeader
                title={'Power Xpert Blue'}
                subtitle={'A design system for Eaton applications'}
                backgroundColor={Colors.blue[500]}
                fontColor={Colors.white[50]}
                // backgroundImage={top}
                icon={<Pxblue />}
                onIconClick={(): void => setOpen(!open)}
            />
            <DrawerBody>
                {navigationData.map((group, index) => {
                    const items: NavItem[] = [];
                    group.data.forEach((data) => {
                        items.push({
                            title: data.title,
                            icon: <Info />,
                            active: location.pathname.includes(data.url || ''),
                            onClick: () => {
                                if (data.url) {
                                    history.push(data.url);
                                }
                            },
                        });
                    });
                    return <DrawerNavGroup key={`group_${index}`} title={group.title} items={items} />;
                })}
            </DrawerBody>
            <DrawerFooter>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <img src={EatonLogo} style={{'margin': '10px'}} alt="Eaton Logo" height={50} width={'auto'}/> */}
                </div>
            </DrawerFooter>
        </Drawer>
    );
};
