import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Tabs, Tab,
    Theme,
    // useTheme,
    createStyles,
    makeStyles,
    List,
    IconButton,
    Badge,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Divider,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import circles from '../assets/circles.svg';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';
import { BugReport, CheckCircle, Description, ExpandMore } from '@material-ui/icons';
// import { useHistory } from 'react-router-dom';


const resources = [
    {
        title: 'All Utilities',
        description: 'Here is a brief description of what utilities are',
        bugs: Math.floor(Math.random() * 6),
        build: true,
        applies: ['all'],
        readme: 'https://www.google.com',
        items: [
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
        ]
    },
    {
        title: 'Angular Utilities',
        description: 'Here is a brief description of what utilities are',
        bugs: Math.floor(Math.random() * 6),
        build: true,
        applies: ['angular'],
        readme: 'https://www.google.com',
        items: [
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
        ]
    },
    {
        title: 'React Utilities',
        description: 'Here is a brief description of what utilities are',
        bugs: Math.floor(Math.random() * 6),
        build: true,
        applies: ['react'],
        readme: 'https://www.google.com',
        items: [
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
            {
                name: '@pxblue/colors',
                version: '1.2.1',
                description: 'Here is a brief description of what the colors package is',
                bugs: Math.floor(Math.random() * 6),
                build: true,
                readme: 'https://www.google.com',
            },
        ]
    },
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        banner: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // marginTop: theme.spacing(8),
            padding: `${theme.spacing(8)}px ${theme.spacing(4)}px`,
            width: '100%',
            color: '#ffffff',
            backgroundColor: Colors.blue[500],
            backgroundImage: `url(${circles})`,
            backgroundSize: 1200,
            backgroundPosition: '-240px center',
            [theme.breakpoints.down('xs')]: {
                // marginTop: theme.spacing(7)
            },
        },
        footer: {
            zIndex: 0,
            backgroundColor: Colors.black[900],
            textAlign: 'center',
            // position: 'absolute',
            // bottom: 0,
        },
    })
);

export const Resources: React.FC = (): JSX.Element => {
    // const history = useHistory();
    // const theme = useTheme();
    const classes = useStyles();
    const [filter, setFilter] = useState('all');

    return (
        <>
            <AppBar position="sticky" color={'primary'} style={{ top: 64 }}>
                <Tabs variant={'standard'} value={filter}>
                    <Tab
                        label="All"
                        value={'all'}
                        onClick={(): void => setFilter('all')}
                    />
                    <Tab
                        label="Angular"
                        value={'angular'}
                        onClick={(): void => setFilter('angular')}
                    />
                    <Tab
                        label="React"
                        value={'react'}
                        onClick={(): void => setFilter('react')}
                    />
                    <Tab
                        label="Ionic"
                        value={'ionic'}
                        onClick={(): void => setFilter('ionic')}
                    />
                    <Tab
                        label="React Native"
                        value={'reactnative'}
                        onClick={(): void => setFilter('reactnative')}
                    />
                </Tabs>
            </AppBar>

            {/* First expander */}
            <div style={{ padding: 20 }}>
                {resources.map((bucket) => (bucket.applies.includes(filter) || bucket.applies.includes('all') || filter === 'all') &&
                    (
                        <ExpansionPanel key={bucket.title} defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMore color={'primary'} />} style={{ padding: '0 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant={'subtitle1'} color={'primary'} style={{ fontWeight: 600 }}>{`${bucket.title} -`}</Typography>
                                    <Typography color={'primary'} style={{ fontWeight: 300 }}>&nbsp;{`${bucket.description}`}</Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ display: 'block', padding: 0 }}>
                                <Divider />
                                <List style={{ padding: 0 }}>
                                    {
                                        bucket.items.map((item, index): JSX.Element => (
                                            <InfoListItem key={item.name}
                                                hidePadding
                                                divider={index < bucket.items.length - 1 ? 'full' : undefined}
                                                title={item.name}
                                                subtitle={item.description}
                                                // statusColor={Math.random() < 0.5 ? Colors.red[500] : Math.random() < 0.5 ? Colors.green[500] : undefined}
                                                rightComponent={
                                                    <>
                                                        <ListItemTag label={`@${item.version}`} style={{ fontWeight: 600, textTransform: 'none' }} />
                                                        <IconButton style={{ color: Colors.black[500] }}><Badge badgeContent={item.bugs} color={'error'}><BugReport /></Badge></IconButton>
                                                        <IconButton style={{ color: Colors.green[500] }}><CheckCircle /></IconButton>
                                                        <IconButton style={{ color: Colors.black[500] }}><Description /></IconButton>
                                                    </>
                                                }
                                            />
                                        ))
                                    }
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                )}
            </div>
            {/* Footer Section */}
            < AppBar position={'static'} className={classes.footer} elevation={0} >
                <Toolbar variant={'dense'}>
                    <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                        Copyright 2020 Eaton. Licensed under BSD-3-Clause.
                    </Typography>
                </Toolbar>
            </AppBar >
        </>

    );
};
