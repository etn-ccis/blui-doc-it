import React from 'react';
import { List } from '@material-ui/core';
import { NotificationsActive } from '@material-ui/icons';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';
import { GradeA } from '@pxblue/icons-mui';
import * as Colors from '@pxblue/colors';

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
            dense
        />
        <InfoListItem
            statusColor={Colors.red[500]}
            avatar
            title={'An info list item with a tag'}
            icon={<NotificationsActive />}
            rightComponent={
                <div style={{ display: 'flex' }}>
                    <ListItemTag label={'active'} backgroundColor={Colors.red[500]} style={{ marginRight: 16 }} />
                </div>
            }
            divider={'partial'}
            onClick={(): void => {
                /* do nothing */
            }}
            ripple
            dense
        />
    </List>
);
