import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Tabs, Tab,
    Theme,
    createStyles,
    makeStyles,
    List,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Divider,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import circles from '../assets/circles.svg';
import { ExpandMore } from '@material-ui/icons';
import { ResourceRow } from '../components/ResourceRow';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE_TITLE } from '../redux/actions';

import { resources, Filter } from '../../__configuration__/resources';

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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: 'Resources' });
    }, [dispatch]);

    return (
        <>
            <AppBar position="sticky" color={'primary'} style={{ top: 64 }}>
                <Tabs variant={'standard'} value={filter}>
                    <Tab
                        style={{ minWidth: 'auto' }}
                        label="All"
                        value={'all'}
                        onClick={(): void => setFilter('all')}
                    />
                    <Tab
                        style={{ minWidth: 'auto' }}
                        label="Angular"
                        value={'angular'}
                        onClick={(): void => setFilter('angular')}
                    />
                    <Tab
                        style={{ minWidth: 'auto' }}
                        label="React"
                        value={'react'}
                        onClick={(): void => setFilter('react')}
                    />
                    <Tab
                        style={{ minWidth: 'auto' }}
                        label="Ionic"
                        value={'ionic'}
                        onClick={(): void => setFilter('ionic')}
                    />
                    <Tab
                        style={{ minWidth: 'auto' }}
                        label="React Native"
                        value={'reactnative'}
                        onClick={(): void => setFilter('reactnative')}
                    />
                </Tabs>
            </AppBar>

            {/* First expander */}
            <div style={{ padding: 20 }}>
                {resources.map((bucket, bIndex) => (!bucket.applies || bucket.applies.includes(filter) || bucket.applies.includes('all') || filter === 'all') &&
                    (
                        <ExpansionPanel key={`${bucket.name}_${bIndex}`} defaultExpanded>

                            <ExpansionPanelSummary expandIcon={<ExpandMore color={'primary'} />} style={{ padding: '0 16px', margin: 0 }} classes={{ content: classes.noMargin }}>
                                <div style={{ flex: '1 1 0px', display: 'flex', alignItems: 'center' }}>
                                    <Typography variant={'subtitle1'} color={'primary'} style={{ fontWeight: 600 }}>{`${bucket.name} -`}</Typography>
                                    <Typography color={'primary'} style={{ fontWeight: 300 }}>&nbsp;{`${bucket.description}`}</Typography>
                                </div>
                                {/* <ExpansionPanelActions>
                                    <ListItemTag label={`@99.99.99`} style={{ fontWeight: 600, textTransform: 'none' }} />
                                    <IconButton style={{ color: Colors.black[500] }}><Badge badgeContent={3} color={'error'}><BugReport /></Badge></IconButton>
                                    <IconButton style={{ color: Colors.green[500] }}><CheckCircle /></IconButton>
                                    <IconButton style={{ color: Colors.black[500] }}><Description /></IconButton>
                                </ExpansionPanelActions> */}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ display: 'block', padding: 0 }}>
                                <Divider />
                                <List style={{ padding: 0 }}>
                                    {
                                        bucket.items.map((item, index): JSX.Element | null => (
                                            item.applies === undefined ||
                                            item.applies.includes(filter) ||
                                            item.applies.includes('all') ||
                                            filter === 'all'
                                        ) ? (
                                                <ResourceRow key={`${item.name}_${index}`}
                                                    title={item.name}
                                                    description={item.description}
                                                    divider={index < bucket.items.length - 1}
                                                    repository={item.repository}
                                                    package={item.package}
                                                    bugLabels={item.bugLabels}
                                                />
                                            ) : null)
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
