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
    ExpansionPanelActions,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import circles from '../assets/circles.svg';
import { ListItemTag } from '@pxblue/react-components';
import { BugReport, CheckCircle, Description, ExpandMore } from '@material-ui/icons';
import { ResourceRow } from '../components/ResourceRow';

type Filter = 'all' | 'angular' | 'react' | 'ionic' | 'reactnative';

type Resource = {
    name: string;
    description: string;
    bugs?: number;
    build?: boolean;
    version?: string;
    package?: string;
    repository?: string;
    applies?: Filter[];
    readme?: string;
}
type ResourceBucket = {
    title: string;
    description: string;
    version?: string;
    bugs?: number;
    build?: boolean;
    package?: string;
    applies: Filter[];
    readme?: string;
    items: Resource[];
}

const resources: ResourceBucket[] = [
    {
        title: 'Misc Stuff',
        description: 'miscellaneous testing stuff',
        // bugs: Math.floor(Math.random() * 6),
        // build: true,
        // package: '@pxblue/angular-components',
        applies: ['angular'],
        readme: 'https://github.com/pxblue/angular-component-library',
        items: [
            {
                name: '@pxblue/colors',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'colors',
                package: '@pxblue/colors'
            },
            {
                name: '@pxblue/icons',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'icons',
                package: '@pxblue/icons'
            },
            {
                name: '@pxblue/icons-mui',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'icons-mui',
                package: '@pxblue/icons-mui'
            },
            {
                name: '@pxblue/react-component-library',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'react-component-library',
                package: '@pxblue/react-components'
            },
            {
                name: '@pxblue/angular-components',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'angular-component-library',
                package: '@pxblue/angular-components'
            },
            {
                name: '@pxblue/mapbox',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'mapbox',
                package: '@pxblue/mapbox'
            },
            {
                name: '@pxblue/colors',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'colors',
                package: '@pxblue/colors'
            },
            {
                name: '@pxblue/icons',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'icons',
                package: '@pxblue/icons'
            },
            {
                name: '@pxblue/icons-mui',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'icons-mui',
                package: '@pxblue/icons-mui'
            },
            {
                name: '@pxblue/react-component-library',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'react-component-library',
                package: '@pxblue/react-components'
            },
            {
                name: '@pxblue/angular-components',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'angular-component-library',
                package: '@pxblue/angular-components'
            },
            {
                name: '@pxblue/mapbox',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'mapbox',
                package: '@pxblue/mapbox'
            },
            {
                name: '@pxblue/colors',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'colors',
                package: '@pxblue/colors'
            },
            {
                name: '@pxblue/icons',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'icons',
                package: '@pxblue/icons'
            },
            {
                name: '@pxblue/icons-mui',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'icons-mui',
                package: '@pxblue/icons-mui'
            },
            {
                name: '@pxblue/react-component-library',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'react-component-library',
                package: '@pxblue/react-components'
            },
            {
                name: '@pxblue/angular-components',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'angular-component-library',
                package: '@pxblue/angular-components'
            },
            {
                name: '@pxblue/mapbox',
                description: 'A component used to render a value with units',
                readme: 'https://github.com/pxblue/angular-component-library/blob/dev/docs/ChannelValue.md',
                repository: 'mapbox',
                package: '@pxblue/mapbox'
            },
        ]
    },
    // {
    //     title: 'All Utilities',
    //     description: 'Here is a brief description of what utilities are',
    //     bugs: Math.floor(Math.random() * 6),
    //     build: true,
    //     applies: ['all'],
    //     readme: 'https://www.google.com',
    //     items: [
    //         {
    //             name: 'React Colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             applies: ['react'],
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //     ]
    // },
    // {
    //     title: 'Angular Utilities',
    //     description: 'Here is a brief description of what utilities are',
    //     bugs: Math.floor(Math.random() * 6),
    //     build: true,
    //     applies: ['angular'],
    //     readme: 'https://www.google.com',
    //     items: [
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //     ]
    // },
    // {
    //     title: 'React Utilities',
    //     description: 'Here is a brief description of what utilities are',
    //     bugs: Math.floor(Math.random() * 6),
    //     build: true,
    //     applies: ['react'],
    //     readme: 'https://www.google.com',
    //     items: [
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //         {
    //             name: '@pxblue/colors',
    //             version: '1.2.1',
    //             description: 'Here is a brief description of what the colors package is',
    //             bugs: Math.floor(Math.random() * 6),
    //             build: true,
    //             readme: 'https://www.google.com',
    //         },
    //     ]
    // },
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
        noMargin: {
            margin: '0 !important'
        }
    })
);

export const Resources: React.FC = (): JSX.Element => {
    // const history = useHistory();
    // const theme = useTheme();
    const classes = useStyles();
    const [filter, setFilter] = useState<Filter>('all');

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
                {resources.map((bucket, bIndex) => (bucket.applies.includes(filter) || bucket.applies.includes('all') || filter === 'all') &&
                    (
                        <ExpansionPanel key={`${bucket.title}_${bIndex}`} defaultExpanded>

                            <ExpansionPanelSummary expandIcon={<ExpandMore color={'primary'} />} style={{ padding: '0 16px', margin: 0 }} classes={{ content: classes.noMargin }}>
                                <div style={{ flex: '1 1 0px', display: 'flex', alignItems: 'center' }}>
                                    <Typography variant={'subtitle1'} color={'primary'} style={{ fontWeight: 600 }}>{`${bucket.title} -`}</Typography>
                                    <Typography color={'primary'} style={{ fontWeight: 300 }}>&nbsp;{`${bucket.description}`}</Typography>
                                </div>
                                <ExpansionPanelActions>
                                    <ListItemTag label={`@99.99.99`} style={{ fontWeight: 600, textTransform: 'none' }} />
                                    <IconButton style={{ color: Colors.black[500] }}><Badge badgeContent={3} color={'error'}><BugReport /></Badge></IconButton>
                                    <IconButton style={{ color: Colors.green[500] }}><CheckCircle /></IconButton>
                                    <IconButton style={{ color: Colors.black[500] }}><Description /></IconButton>
                                </ExpansionPanelActions>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ display: 'block', padding: 0 }}>
                                <Divider />
                                <List style={{ padding: 0 }}>
                                    {
                                        bucket.items.map((item, index): JSX.Element => (
                                            <ResourceRow key={`${item.name}_${index}`}
                                                title={item.name} 
                                                description={item.description} 
                                                divider={index < bucket.items.length - 1}
                                                repository={item.repository} 
                                                package={item.package}
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
