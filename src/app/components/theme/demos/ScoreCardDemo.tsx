import React from 'react';
import { Hero, InfoListItem, ScoreCard } from '@pxblue/react-components';
import { Temp } from '@pxblue/icons-mui';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { CloudDone, Info, Notifications } from '@material-ui/icons';

/*
 * cannot iterate through variations due to the way MUI implemented text fields
 */

export const ScoreCardDemo: JSX.Element = (
    <ScoreCard
        headerTitle={'Score Card'}
        headerSubtitle={'PX Blue'}
        headerInfo={'Used for summary of an asset'}
        style={{ width: 320, margin: '64px 16px', flex: '0 0 auto' }}
        badge={
            <Hero
                key={'hero1'}
                icon={<Temp fontSize={'inherit'} />}
                label={'Temperature'}
                iconSize={48}
                value={98}
                units={'°F'}
                fontSize={'normal'}
            />
        }
        actionRow={<InfoListItem dense chevron title={'View Location'} hidePadding />}
    >
        <List>
            <ListItem style={{ paddingBottom: 4, paddingTop: 4 }}>
                <ListItemIcon>
                    <Notifications />
                </ListItemIcon>
                <ListItemText primary={'0 alarms'} />
            </ListItem>
            <ListItem style={{ paddingBottom: 4, paddingTop: 4 }}>
                <ListItemIcon>
                    <Info />
                </ListItemIcon>
                <ListItemText primary={'2 events'} />
            </ListItem>
            <ListItem style={{ paddingBottom: 4, paddingTop: 4 }}>
                <ListItemIcon>
                    <CloudDone />
                </ListItemIcon>
                <ListItemText primary={'Online'} />
            </ListItem>
        </List>
    </ScoreCard>
);
