import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Typography,
    Tabs,
    Tab,
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
import { PackageRow /*ResourceRow*/, ExampleRow } from '../components';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE_TITLE } from '../redux/actions';

import { resources, Filter } from '../../__configuration__/resources';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabs:{
            top: theme.spacing(8),
            [theme.breakpoints.down('xs')]: {
                top: theme.spacing(7),
            },
        },
        expanderHeader: {
            flex: '1 1 0px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            overflow: 'hidden',
        },
        expanderSubtitle: {
            fontWeight: 300,
            fontSize: '0.875rem',
        },
        expanderTitle: {
            fontWeight: 600,
            flex: '0 0 auto',
            marginRight: 4,
            fontSize: '0.875rem',
        },
        noMargin: {
            overflow: 'hidden',
            margin: '0 !important',
            '&$expanded': {
                minHeight: theme.spacing(6),
            },
        },
        expanded: {},
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
                        value={'react-native'}
                        onClick={(): void => setFilter('react-native')}
                    />
                </Tabs>
            </AppBar>

            {/* First expander */}
            <div style={{ padding: 20, margin: '0 auto', maxWidth: 1024 }}>
                {resources.map(
                    (bucket, bIndex) =>
                        (!bucket.applies ||
                            bucket.applies.includes(filter) ||
                            bucket.applies.includes('all') ||
                            filter === 'all') && (
                            <ExpansionPanel key={`${bucket.name}_${bIndex}`} defaultExpanded>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMore color={'primary'} />}
                                    style={{ padding: '0 16px', margin: 0 }}
                                    classes={{
                                        root: classes.noMargin,
                                        content: classes.noMargin,
                                        expanded: classes.expanded,
                                    }}
                                >
                                    <div className={classes.expanderHeader}>
                                        <Typography
                                            variant={'subtitle1'}
                                            noWrap
                                            color={'primary'}
                                            className={classes.expanderTitle}
                                        >{`${bucket.name}: `}</Typography>
                                        <Typography
                                            color={'primary'}
                                            noWrap
                                            className={classes.expanderSubtitle}
                                        >{`${bucket.description}`}</Typography>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{ display: 'block', padding: 0 }}>
                                    <Divider />
                                    <List style={{ padding: 0 }}>
                                        {bucket.items.map((item, index): JSX.Element | null =>
                                            item.applies === undefined ||
                                            item.applies.includes(filter) ||
                                            item.applies.includes('all') ||
                                            filter === 'all' ? (
                                                item.package ? (
                                                    <PackageRow
                                                        key={`${item.name}_${index}`}
                                                        package={item.package}
                                                        repository={item.repository || ''}
                                                        description={item.description}
                                                        divider={index < bucket.items.length - 1}
                                                    />
                                                ) : (
                                                    <ExampleRow
                                                        key={`${item.name}_${index}`}
                                                        name={item.name}
                                                        repository={item.repository || ''}
                                                        description={item.description}
                                                        branches={filter !== 'all' ? [filter] : item.applies}
                                                        bugLabels={filter !== 'all' ? [filter] : []}
                                                        divider={index < bucket.items.length - 1}
                                                    />
                                                )
                                            ) : null
                                        )}
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                )}
            </div>
        </>
    );
};
