import React from 'react';
import { AppBar, Avatar, Tabs, Tab, IconButton, Badge } from '@material-ui/core';
import { DropdownToolbar, Spacer } from '@brightlayer-ui/react-components';
import { Menu, Notifications, Search } from '@material-ui/icons';

/*
 * cannot iterate through variations due to the way MUI implemented text fields
 */

export const AppBarDemo: JSX.Element = (
    <div
        style={{
            padding: 16,
            width: '100%',
            minHeight: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}
    >
        <AppBar position={'static'} key={'primary'} color={'primary'} style={{ zIndex: 0 }}>
            <DropdownToolbar
                title={'Primary'}
                subtitle={'This is the App Bar pinned to the top'}
                navigationIcon={<Menu />}
                menuGroups={[
                    { items: [{ title: 'Brightlayer UI' }, { title: 'PX Rainbow' }, { title: 'PX Unicorn' }] },
                ]}
            >
                <Spacer />
                <IconButton color={'inherit'}>
                    <Search />
                </IconButton>
                <IconButton color={'inherit'} style={{ marginRight: 12 }}>
                    <Badge badgeContent={3} color={'error'}>
                        <Notifications />
                    </Badge>
                </IconButton>
                <Avatar />
            </DropdownToolbar>
        </AppBar>

        <AppBar position={'static'} key={'secondary'} color={'secondary'} style={{ zIndex: 0 }}>
            <Tabs value={0}>
                <Tab value={0} label={'Secondary'} />
                <Tab value={1} label={'App Bar'} />
                <Tab value={2} label={'with Tabs'} />
            </Tabs>
        </AppBar>
    </div>
);
