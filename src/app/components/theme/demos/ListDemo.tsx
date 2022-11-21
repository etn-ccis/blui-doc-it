import React from 'react';
import { Badge, IconButton, List } from '@mui/material';
import { AddBox, Assignment, Delete, DeviceHub, NotificationsActive } from '@mui/icons-material';
import { InfoListItem, ListItemTag } from '@brightlayer-ui/react-components';
import { GradeA } from '@brightlayer-ui/icons-mui';
import * as Colors from '@brightlayer-ui/colors';

export const ListDemo: JSX.Element = (
    <List style={{ width: '100%' }}>
        <InfoListItem
            title={'Info List Item'}
            subtitle={'A Dynamic Rich Display of information'}
            icon={<GradeA />}
            divider={'partial'}
            iconAlign={'center'}
            onClick={(): void => {
                /* do nothing */
            }}
            ripple
        />
        <InfoListItem
            statusColor={Colors.red[500]}
            avatar
            title={'An info list item with a tag'}
            icon={<NotificationsActive />}
            rightComponent={
                <div style={{ display: 'flex' }}>
                    <ListItemTag label={'active'} backgroundColor={Colors.red[500]} style={{ marginLeft: 16 }} />
                </div>
            }
            divider={'partial'}
            onClick={(): void => {
                /* do nothing */
            }}
            ripple
        />
        <InfoListItem
            title={'An info list item with list actions on the right'}
            icon={<DeviceHub />}
            rightComponent={
                <div style={{ display: 'flex' }}>
                    <IconButton>
                        <Delete />
                    </IconButton>
                    <IconButton>
                        <Assignment />
                    </IconButton>
                    <IconButton edge={'end'}>
                        <Badge color={'primary'} variant={'dot'}>
                            <AddBox />
                        </Badge>
                    </IconButton>
                </div>
            }
            iconAlign={'center'}
            divider={'partial'}
        />
    </List>
);
