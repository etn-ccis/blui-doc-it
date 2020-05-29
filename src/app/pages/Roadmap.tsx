import React, { useState, useCallback, useEffect } from 'react';
import {
    AppBar,
    Typography,
    Theme,
    createStyles,
    makeStyles,
    List,
    ExpansionPanel,
    ExpansionPanelDetails,
    Divider,
    Select,
    MenuItem,
    Toolbar,
    useTheme,
} from '@material-ui/core';

import { PageContent, ExpansionHeader } from '../components';

import { Status, RoadmapItem, Quarter, RoadmapBucket, FrameworkFilter } from '../../__types__';
import { usePageTitle } from '../hooks/usePageTitle';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';

import { EmptyState, InfoListItem, ListItemTag } from '@pxblue/react-components';

import * as Colors from '@pxblue/colors';
import { useBackgroundColor } from '../hooks/useBackgroundColor';
import { PXBlueColor } from '@pxblue/types';
import { getRoadmap } from '../api';
import { ErrorOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        secondaryToolbar: {
            color: theme.palette.primary.contrastText,
            top: theme.spacing(8),
            height: theme.spacing(6),
            [theme.breakpoints.down('xs')]: {
                top: theme.spacing(7),
            },
        },
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
        title: {
            fontWeight: 600,
            lineHeight: 1.2,
            fontSize: '0.875rem',
        },
        selectIcon: {
            color: Colors.white[50],
        },
        emptyStateWrapper: {
            position: 'relative',
            top: '28vh',
            [theme.breakpoints.down('sm')]: {
                top: '22vh',
            },
        },
    })
);

const getStatusColor = (status: Status): PXBlueColor | undefined => {
    switch (status) {
        case 'finished':
            return Colors.green;
        case 'in-progress':
            return Colors.blue;
        case 'pre-release':
            return Colors.purple;
        case 'deferred':
            return Colors.orange;
        case 'backlog':
        default:
            return undefined;
    }
};

export const Roadmap: React.FC = (): JSX.Element => {
    usePageTitle('Roadmap');
    useGoogleAnalyticsPageView();
    useBackgroundColor(Colors.gray[50]);
    const classes = useStyles();
    const [frameworkFilter, setFrameworkFilter] = useState<FrameworkFilter>('all');
    const [quarterFilter, setQuarterFilter] = useState<Quarter | 'Quarter'>('Quarter');
    const [roadmap, setRoadmap] = useState<RoadmapBucket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const theme = useTheme();
    const loadingGroups = [
        [1, 2, 3, 4],
        [1, 2, 3],
        [1, 2, 3],
    ];

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        const loadRoadmap = async (): Promise<void> => {
            const data = await getRoadmap();
            if (isMounted) {
                setRoadmap(data || []);
            }
            setLoading(false);
        };
        loadRoadmap();
        return (): void => {
            isMounted = false;
        };
    }, []);

    const filteredBuckets = roadmap.filter(
        (bucket) =>
            !bucket.applies ||
            bucket.applies.includes(frameworkFilter) ||
            bucket.applies.includes('all') ||
            frameworkFilter === 'all'
    );

    const getTags = useCallback(
        (item: RoadmapItem): JSX.Element | undefined => {
            const statusTags: JSX.Element[] = [];
            const authorTags: JSX.Element[] = [];
            const { status, author } = item;
            const statusColor = getStatusColor(status);

            if (status !== 'backlog') {
                statusTags.push(
                    <ListItemTag
                        key={`${item.name}_status`}
                        className={classes.tag}
                        label={status}
                        fontColor={statusColor ? statusColor[500] : undefined}
                        backgroundColor={statusColor ? statusColor[50] : undefined}
                    />
                );
            }
            if (author !== undefined && author !== 'PX Blue') {
                statusTags.push(<ListItemTag key={`${item.name}_author`} className={classes.tag} label={author} />);
            }
            const result = authorTags.concat(statusTags);
            return result.length ? <div className={classes.tagWrapper}>{result}</div> : undefined;
        },
        [classes, roadmap]
    );

    return (
        <>
            <AppBar position="sticky" color={'secondary'} className={classes.secondaryToolbar} elevation={0}>
                <Toolbar style={{ minHeight: theme.spacing(6) }}>
                    <Select
                        value={frameworkFilter}
                        disableUnderline
                        style={{ minWidth: 100, alignSelf: 'stretch', color: theme.palette.primary.contrastText }}
                        onChange={(e): void => setFrameworkFilter(e.target.value as FrameworkFilter)}
                        classes={{ icon: classes.selectIcon }}
                    >
                        <MenuItem value={'all'}>All Frameworks</MenuItem>
                        <MenuItem value={'angular'}>Angular</MenuItem>
                        <MenuItem value={'react'}>React</MenuItem>
                        <MenuItem value={'ionic'}>Ionic</MenuItem>
                        <MenuItem value={'react-native'}>React Native</MenuItem>
                    </Select>
                    <Select
                        value={quarterFilter}
                        disableUnderline
                        style={{
                            marginLeft: theme.spacing(2),
                            minWidth: 100,
                            alignSelf: 'stretch',
                            color: theme.palette.primary.contrastText,
                        }}
                        onChange={(e): void => setQuarterFilter(e.target.value as Quarter)}
                        classes={{ icon: classes.selectIcon }}
                    >
                        <MenuItem value={'Quarter'}>All Quarters</MenuItem>
                        {/* <MenuItem value={'Q1'}>Q1</MenuItem> */}
                        <MenuItem value={'Q2'}>Q2</MenuItem>
                        <MenuItem value={'Q3'}>Q3</MenuItem>
                        {/* <MenuItem value={'Q4'}>Q4</MenuItem> */}
                    </Select>
                </Toolbar>
            </AppBar>
            <PageContent>
                {loading && (
                    <div>
                        {loadingGroups.map((group, groupNumber) =>
                            group.map((item, i) => (
                                <div
                                    className="ph-item"
                                    key={`ph-group${groupNumber}-${i}`}
                                    style={{ marginBottom: groupNumber > 0 && i === 0 ? 48 : 0 }}
                                >
                                    <div className="ph-col-12">
                                        <div className="ph-row" style={{ flexWrap: 'unset' }}>
                                            <div className="ph-avatar" style={{ width: 30, height: 30, minWidth: 0 }} />
                                            <div style={{ marginLeft: 16, width: '100%', backgroundColor: 'unset' }}>
                                                <div style={{ display: 'flex', width: '33%', height: 12 }} />
                                                <div style={{ display: 'flex', width: '66%', height: 12 }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {!loading && filteredBuckets.length === 0 && (
                    <div className={classes.emptyStateWrapper}>
                        <EmptyState
                            icon={<ErrorOutline fontSize={'inherit'} style={{ marginBottom: '0' }} />}
                            title={'No Roadmap Data'}
                            description={'Roadmap data could not be retrieved at this time.'}
                        />
                    </div>
                )}

                {!loading &&
                    filteredBuckets.map((bucket, bIndex) => {
                        const filteredItems = bucket.items.filter(
                            (item) =>
                                (item.applies === undefined ||
                                    item.applies.includes(frameworkFilter) ||
                                    item.applies.includes('all') ||
                                    frameworkFilter === 'all') &&
                                (item.quarter === quarterFilter || quarterFilter === 'Quarter')
                        );
                        if (filteredItems.length === 0) return null;
                        return (
                            <ExpansionPanel key={`${bucket.name}_${bIndex}`} defaultExpanded>
                                <ExpansionHeader name={bucket.name} description={bucket.description} />
                                <ExpansionPanelDetails style={{ display: 'block', padding: 0 }}>
                                    <Divider />
                                    <List style={{ padding: 0 }}>
                                        {filteredItems.map((item, index): JSX.Element | null => {
                                            const statusColor = getStatusColor(item.status);
                                            return (
                                                <InfoListItem
                                                    key={`roadmap_item_${index}`}
                                                    hidePadding
                                                    divider={index === bucket.items.length - 1 ? undefined : 'full'}
                                                    title={
                                                        <Typography className={classes.title}>{item.name}</Typography>
                                                    }
                                                    subtitle={item.description}
                                                    statusColor={statusColor ? statusColor[500] : undefined}
                                                    wrapSubtitle
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
                                            );
                                        })}
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        );
                    })}
            </PageContent>
        </>
    );
};
