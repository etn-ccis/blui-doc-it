import React, { useState, useCallback, useEffect } from 'react';
import {
    AppBar,
    Typography,
    Theme,
    createStyles,
    makeStyles,
    List,
    Accordion,
    AccordionDetails,
    Divider,
    Select,
    MenuItem,
    Toolbar,
    Button,
    useTheme,
} from '@material-ui/core';

import { PageContent, ExpansionHeader } from '../components';

import { Status, RoadmapItem, RoadmapBucket, FrameworkFilter, ItemTypeFilter, Release } from '../../__types__';
import { usePageTitle } from '../hooks/usePageTitle';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';

import { EmptyState, InfoListItem, ListItemTag, Spacer } from '@pxblue/react-components';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';
import * as Colors from '@pxblue/colors';
import { useBackgroundColor } from '../hooks/useBackgroundColor';
import { PXBlueColor } from '@pxblue/types';
import { getRoadmap } from '../api';
import { ErrorOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        secondaryAppbar: {
            color: theme.palette.primary.contrastText,
            top: theme.spacing(8),
            height: theme.spacing(6),
            [theme.breakpoints.down('xs')]: {
                top: theme.spacing(7),
            },
        },
        secondaryToolbar: {
            minHeight: theme.spacing(6),
            [theme.breakpoints.down('xs')]: {
                overflowX: 'auto',
            },
        },
        select: {
            // minWidth: 100,
            alignSelf: 'stretch',
            color: theme.palette.primary.contrastText,
            '&:not(:first-child)': {
                marginLeft: theme.spacing(2),
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
            color: theme.palette.primary.contrastText,
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
    const theme = useTheme();
    const classes = useStyles(theme);
    const [typeFilter, setTypeFilter] = useState<ItemTypeFilter>('all');
    const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
    const [frameworkFilter, setFrameworkFilter] = useState<FrameworkFilter>('all');
    const [releaseFilter, setReleaseFilter] = useState<Release | 'all'>('R18');
    const [roadmap, setRoadmap] = useState<RoadmapBucket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const searchActive = useSelector((state: AppState) => state.app.searchActive);
    const loadingGroups = [
        [1, 2, 3, 4],
        [1, 2, 3],
        [1, 2, 3],
    ];

    usePageTitle('Roadmap');
    useGoogleAnalyticsPageView();
    useBackgroundColor(theme.palette.background.default);

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

    const filterByRelease = (release: Release, item: any): boolean =>
        (release === 'R16' && item.quarter === 'Q2' && item.year === 2020) ||
        (release === 'R17' && item.quarter === 'Q3' && item.year === 2020) ||
        (release === 'R18' && item.quarter === 'Q4' && item.year === 2020) ||
        (release === 'R19' && item.quarter === 'Q1' && item.year === 2021);

    const clearFilters = useCallback(() => {
        setTypeFilter('all');
        setFrameworkFilter('all');
        setReleaseFilter('all');
        setStatusFilter('all');
    }, [setTypeFilter, setFrameworkFilter, setReleaseFilter, setStatusFilter]);

    let results = 0;
    const roadmapBuckets =
        // Filter buckets by item type
        roadmap
            .map((bucket) => ({
                // TODO: Remove this map function in the next push (it's only here for backwards compatibility with the older Roadmap types)
                ...bucket,
                type: bucket.type ? bucket.type : 'development',
                // @ts-ignore
                framework: bucket.framework ? bucket.framework : bucket.applies,
            }))
            .filter(
                (bucket) => !bucket.type || bucket.type === typeFilter || bucket.type === 'all' || typeFilter === 'all'
            )
            // Filter buckets by framework
            .filter(
                (bucket) =>
                    typeFilter === 'design' || // if filtering by design, ignore the framework filter
                    !bucket.framework ||
                    bucket.framework.includes(frameworkFilter) ||
                    bucket.framework.includes('all') ||
                    frameworkFilter === 'all'
            )
            // Filter line items by remaining filters
            .map((bucket) => ({
                ...bucket,
                items: bucket.items
                    .map((item) => ({
                        // TODO: Remove this map function in the next push (it's only here for backwards compatibility with the older Roadmap types)
                        ...item,
                        // @ts-ignore
                        framework: item.framework ? item.framework : item.applies,
                    }))
                    .filter((item) => {
                        const show =
                            (typeFilter === 'design' || // if filtering by design, ignore the framework filter
                                item.framework === undefined ||
                                item.framework.includes(frameworkFilter) ||
                                item.framework.includes('all') ||
                                frameworkFilter === 'all') &&
                            (filterByRelease(releaseFilter, item) || releaseFilter === 'all') &&
                            (item.status === statusFilter || statusFilter === 'all');
                        if (show) results++;
                        return show;
                    }),
            }));

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
                statusTags.push(
                    <ListItemTag
                        key={`${item.name}_author`}
                        className={classes.tag}
                        label={author}
                        backgroundColor={Colors.blue[500]}
                        fontColor={Colors.white[50]}
                    />
                );
            }
            const result = authorTags.concat(statusTags);
            return result.length ? <div className={classes.tagWrapper}>{result}</div> : undefined;
        },
        [classes, roadmap]
    );

    return (
        <>
            <AppBar
                position={searchActive ? 'static' : 'sticky'} // to avoid the filter bar "pops out" when searching
                color={'secondary'}
                className={classes.secondaryAppbar}
                elevation={0}
            >
                <Toolbar className={classes.secondaryToolbar}>
                    <Select
                        value={typeFilter}
                        disableUnderline
                        onChange={(e): void => setTypeFilter(e.target.value as ItemTypeFilter | 'all')}
                        classes={{ icon: classes.selectIcon }}
                        className={classes.select}
                    >
                        <MenuItem value={'all'}>Any Type</MenuItem>
                        <MenuItem value={'design'}>Design</MenuItem>
                        <MenuItem value={'development'}>Develop</MenuItem>
                    </Select>
                    {(typeFilter === 'all' || typeFilter === 'development') && (
                        <Select
                            value={frameworkFilter}
                            disableUnderline
                            onChange={(e): void => setFrameworkFilter(e.target.value as FrameworkFilter)}
                            classes={{ icon: classes.selectIcon }}
                            className={classes.select}
                        >
                            <MenuItem value={'all'}>Any Framework</MenuItem>
                            <MenuItem value={'angular'}>Angular</MenuItem>
                            <MenuItem value={'react'}>React</MenuItem>
                            <MenuItem value={'ionic'}>Ionic</MenuItem>
                            <MenuItem value={'react-native'}>React Native</MenuItem>
                        </Select>
                    )}
                    <Select
                        value={releaseFilter}
                        disableUnderline
                        onChange={(e): void => setReleaseFilter(e.target.value as Release)}
                        classes={{ icon: classes.selectIcon }}
                        className={classes.select}
                    >
                        <MenuItem value={'all'}>Any Release</MenuItem>
                        <MenuItem value={'R16'}>R16 (2Q20)</MenuItem>
                        <MenuItem value={'R17'}>R17 (3Q20)</MenuItem>
                        <MenuItem value={'R18'}>R18 (4Q20)</MenuItem>
                        <MenuItem value={'R19'}>R19 (1Q21)</MenuItem>
                    </Select>
                    <Select
                        value={statusFilter}
                        disableUnderline
                        onChange={(e): void => setStatusFilter(e.target.value as Status | 'all')}
                        classes={{ icon: classes.selectIcon }}
                        className={classes.select}
                    >
                        <MenuItem value={'all'}>Any Status</MenuItem>
                        <MenuItem value={'backlog'}>Todo</MenuItem>
                        <MenuItem value={'in-progress'}>In Progress</MenuItem>
                        <MenuItem value={'pre-release'}>Pre-Release</MenuItem>
                        <MenuItem value={'deferred'}>Deferred</MenuItem>
                        <MenuItem value={'finished'}>Finished</MenuItem>
                    </Select>
                    <Spacer width={16} height={16} flex={0} />{' '}
                    {/* https://stackoverflow.com/questions/26888428/display-flex-loses-right-padding-when-overflowing */}
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

                {!loading && (roadmapBuckets.length === 0 || results < 1) && (
                    <div className={classes.emptyStateWrapper}>
                        <EmptyState
                            icon={<ErrorOutline fontSize={'inherit'} style={{ marginBottom: '0' }} />}
                            title={'No Roadmap Items'}
                            description={'No Roadmap items matched your filters'}
                            actions={
                                <Button color={'primary'} variant={'outlined'} onClick={(): void => clearFilters()}>
                                    Clear Filters
                                </Button>
                            }
                        />
                    </div>
                )}

                {!loading &&
                    roadmapBuckets.map((bucket, bIndex) => {
                        if (roadmapBuckets[bIndex].items.length < 1) return null;
                        return (
                            <Accordion key={`${bucket.name}_${bIndex}`} defaultExpanded>
                                <ExpansionHeader name={bucket.name} description={bucket.description} />
                                <AccordionDetails style={{ display: 'block', padding: 0 }}>
                                    <Divider />
                                    <List style={{ padding: 0 }}>
                                        {bucket.items.map((item, index): JSX.Element | null => {
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
                                                    statusColor={statusColor ? statusColor[500] : ''}
                                                    wrapSubtitle
                                                    leftComponent={
                                                        <div style={{ display: 'block' }}>
                                                            <Typography
                                                                variant={'subtitle2'}
                                                                align={'center'}
                                                                style={{
                                                                    fontWeight: 600,
                                                                    lineHeight: 1,
                                                                    marginBottom: 4,
                                                                }}
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
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
            </PageContent>
        </>
    );
};
