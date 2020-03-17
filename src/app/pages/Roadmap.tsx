import React, { useState, useCallback } from 'react';
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

import { ExpandMore } from '@material-ui/icons';
import { PageContent } from '../components';

import { roadmap, Status, RoadmapItem } from '../../__configuration__/roadmap';
import { usePageTitle } from '../hooks/usePageTitle';
import { FrameworkFilter } from '../../__types__';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';

import * as Colors from '@pxblue/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabs: {
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
        tagWrapper: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                display: 'none',
            },
        },
        tag: {
            '&:not(:first-child)': {
                marginLeft: theme.spacing(1),
                [theme.breakpoints.down('sm')]: {
                    marginLeft: 0,
                    marginTop: theme.spacing(1),
                },
            },
        },
    })
);

const getStatusColor = (status: Status): string | undefined => {
    switch (status) {
        case 'done':
            return Colors.green[500];
        case 'in-progress':
            return Colors.yellow[900];
        case 'backlog':
        default:
            return undefined;
    }
};

export const Roadmap: React.FC = (): JSX.Element => {
    // const history = useHistory();
    // const theme = useTheme();
    usePageTitle('Roadmap');
    const classes = useStyles();
    const [filter, setFilter] = useState<FrameworkFilter>('all');

    const getTags = useCallback(
        (item: RoadmapItem): JSX.Element | undefined => {
            const statusTags: JSX.Element[] = [];
            const authorTags: JSX.Element[] = [];
            const { status, author } = item;

            if (status !== 'backlog') {
                statusTags.push(
                    <ListItemTag
                        key={`${item.name}_status`}
                        className={classes.tag}
                        label={status}
                        backgroundColor={getStatusColor(status)}
                    />
                );
            }
            if (author !== undefined && author !== 'PX Blue') {
                statusTags.push(<ListItemTag key={`${item.name}_author`} className={classes.tag} label={author} />);
            }
            const result = authorTags.concat(statusTags);
            return result.length ? <div className={classes.tagWrapper}>{result}</div> : undefined;
        },
        [classes]
    );

    const filteredBuckets = roadmap.filter(
        (bucket) =>
            !bucket.applies || bucket.applies.includes(filter) || bucket.applies.includes('all') || filter === 'all'
    );

    return (
        <>
            <AppBar position="sticky" color={'primary'} className={classes.tabs}>
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
            <PageContent>
                {filteredBuckets.map((bucket, bIndex) => {
                    const filteredItems = bucket.items.filter(
                        (item) =>
                            item.applies === undefined ||
                            item.applies.includes(filter) ||
                            item.applies.includes('all') ||
                            filter === 'all'
                    );
                    if (filteredItems.length === 0) return null;
                    return (
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
                                    {filteredItems.map((item, index): JSX.Element | null => (
                                        <InfoListItem
                                            key={`roadmap_item_${index}`}
                                            hidePadding
                                            divider={index === bucket.items.length - 1 ? undefined : 'full'}
                                            title={item.name}
                                            subtitle={item.description}
                                            statusColor={getStatusColor(item.status)}
                                            leftComponent={
                                                <div style={{ display: 'block' }}>
                                                    <Typography
                                                        variant={'subtitle2'}
                                                        align={'center'}
                                                        style={{ fontWeight: 600, lineHeight: 1.5 }}
                                                    >
                                                        {item.quarter}
                                                    </Typography>
                                                    <Typography
                                                        variant={'caption'}
                                                        display={'block'}
                                                        align={'center'}
                                                        style={{ color: Colors.gray[500], lineHeight: 1 }}
                                                    >
                                                        {item.year}
                                                    </Typography>
                                                </div>
                                            }
                                            rightComponent={getTags(item)}
                                        />
                                    ))}
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </PageContent>
        </>
    );
};
