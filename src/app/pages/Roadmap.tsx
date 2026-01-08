import React, { useState, useCallback, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { PageContent, ExpansionHeader } from '../components';

import { Status, RoadmapItem, FrameworkFilter, ItemTypeFilter, Release } from '../../__types__';
import { usePageTitle } from '../hooks/usePageTitle';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';
import { getScheduledSiteConfig } from '../../__configuration__/themes';

import { EmptyState, InfoListItem, ListItemTag, Spacer } from '@brightlayer-ui/react-components';
import { useAppSelector, useAppDispatch, RootState, setRoadmapLoading, setRoadmapData } from '../redux';
import * as Colors from '@brightlayer-ui/colors';
import color from 'color';
import { useBackgroundColor } from '../hooks/useBackgroundColor';
import { BLUIColor } from '@brightlayer-ui/types';
import { getRoadmap } from '../api';
import { ErrorOutline } from '@mui/icons-material';
import clsx from 'clsx';
import { AVAILABLE_RELEASES, CURRENT_RELEASE } from '../../__configuration__/roadmap';

const styles: Record<string, SxProps<Theme>> = {
    secondaryAppbar: {
        color: 'primary.contrastText',
        top: { xs: 56, sm: 64 },
        height: { xs: 48 },
    },
    secondaryToolbar: {
        minHeight: { xs: 48, sm: 48 },
        height: 48,
        overflowX: 'auto',
    },
    select: {
        alignSelf: 'stretch',
        '&:not(:first-of-type)': {
            ml: 2,
        },
    },
    tagWrapper: {
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        display: { xs: 'none', sm: 'flex' },
        gap: 1,
    },
    title: {
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: '0.875rem',
    },
    emptyStateWrapper: {
        position: 'relative',
        top: { xs: '22vh', sm: '28vh' },
    },
};

const getStatusColor = (status: Status): BLUIColor | undefined => {
    switch (status) {
        case 'finished':
            return Colors.green;
        case 'in-progress':
            return Colors.lightBlue;
        case 'pre-release':
            return Colors.purple;
        case 'deferred':
            return Colors.orange;
        case 'backlog':
        default:
            return undefined;
    }
};

export const Roadmap: React.FC = (): React.JSX.Element => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [typeFilter, setTypeFilter] = useState<ItemTypeFilter>('all');
    const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
    const [frameworkFilter, setFrameworkFilter] = useState<FrameworkFilter>('all');
    const [releaseFilter, setReleaseFilter] = useState<Release>(CURRENT_RELEASE);
    const searchActive = useAppSelector((state: RootState) => state.app.searchActive);
    const showBanner = useAppSelector((state: RootState) => state.app.showBanner);
    const selectedTheme = useAppSelector((state: RootState) => state.app.theme);
    const roadmapCache = useAppSelector((state: RootState) => state.app.roadmapCache);
    const roadmapLoading = useAppSelector((state: RootState) => state.app.roadmapLoading);

    // Get roadmap data from cache or empty array if not cached
    const roadmap = roadmapCache[releaseFilter] || [];
    // Show loading if explicitly loading OR if no data exists and we haven't finished loading
    const loading =
        roadmapLoading[releaseFilter] === true || (roadmap.length === 0 && !(releaseFilter in roadmapCache));
    const loadingGroups = [
        [1, 2, 3, 4],
        [1, 2, 3],
        [1, 2, 3],
    ];

    usePageTitle('Roadmap');
    useGoogleAnalyticsPageView();
    useBackgroundColor(theme.palette.background.default);

    useEffect(() => {
        // Don't fetch if we already have data for this release
        if (releaseFilter in roadmapCache) {
            return;
        }

        // Don't fetch if we're already loading this release
        if (roadmapLoading[releaseFilter] === true) {
            return;
        }

        // Set loading state and fetch data
        dispatch(setRoadmapLoading({ release: releaseFilter, loading: true }));

        const loadRoadmap = async (): Promise<void> => {
            const data = await getRoadmap(releaseFilter);
            dispatch(setRoadmapData({ release: releaseFilter, data: data ?? [] }));
        };
        void loadRoadmap();
    }, [releaseFilter, roadmapCache, roadmapLoading, dispatch]);

    const clearFilters = useCallback(() => {
        setTypeFilter('all');
        setFrameworkFilter('all');
        setReleaseFilter(CURRENT_RELEASE);
        setStatusFilter('all');
    }, [setTypeFilter, setFrameworkFilter, setReleaseFilter, setStatusFilter]);

    let results = 0;
    const roadmapBuckets =
        // Filter buckets by item type
        roadmap
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
                items: bucket.items.filter((item) => {
                    const show =
                        (typeFilter === 'design' || // if filtering by design, ignore the framework filter
                            item.framework === undefined ||
                            item.framework.includes(frameworkFilter) ||
                            item.framework.includes('all') ||
                            frameworkFilter === 'all') &&
                        (item.status === statusFilter || statusFilter === 'all');
                    if (show) results++;
                    return show;
                }),
            }));

    const getTags = useCallback(
        (item: RoadmapItem): React.JSX.Element | undefined => {
            const statusTags: React.JSX.Element[] = [];
            const authorTags: React.JSX.Element[] = [];
            const { status, author } = item;
            const statusColor = getStatusColor(status);

            if (status !== 'backlog') {
                statusTags.push(
                    <ListItemTag
                        key={`${item.name}_status`}
                        sx={styles.tag}
                        label={status}
                        fontColor={statusColor ? statusColor[theme.palette.mode === 'dark' ? 200 : 500] : undefined}
                        backgroundColor={
                            statusColor
                                ? color(statusColor[500])
                                      .fade(theme.palette.mode === 'dark' ? 0.8 : 0.9)
                                      .string()
                                : undefined
                        }
                    />
                );
            }
            if (author !== undefined && author !== 'Brightlayer UI' && author !== 'PX Blue') {
                statusTags.push(
                    <ListItemTag
                        key={`${item.name}_author`}
                        sx={styles.tag}
                        label={author}
                        backgroundColor={Colors.blue[500]}
                        fontColor={Colors.white[50]}
                    />
                );
            }
            const result = authorTags.concat(statusTags);
            return result.length ? <Box sx={styles.tagWrapper}>{result}</Box> : undefined;
        },
        [roadmap]
    );

    return (
        <>
            <AppBar
                position={searchActive ? 'static' : 'sticky'} // to avoid the filter bar "pops out" when searching
                color={'secondary'}
                sx={{
                    ...styles.secondaryAppbar,
                    ...(showBanner ? { top: { xs: 2 * 56, sm: 2 * 64 } } : {}),
                }}
                elevation={0}
            >
                <Toolbar sx={styles.secondaryToolbar}>
                    <Select
                        variant={'standard'}
                        disableUnderline
                        value={typeFilter}
                        onChange={(e): void => setTypeFilter(e.target.value as ItemTypeFilter | 'all')}
                        sx={styles.select}
                    >
                        <MenuItem value={'all'}>Any Type</MenuItem>
                        <MenuItem value={'design'}>Design</MenuItem>
                        <MenuItem value={'development'}>Develop</MenuItem>
                    </Select>
                    {(typeFilter === 'all' || typeFilter === 'development') && (
                        <Select
                            value={frameworkFilter}
                            variant={'standard'}
                            disableUnderline
                            onChange={(e): void => setFrameworkFilter(e.target.value as FrameworkFilter)}
                            sx={styles.select}
                        >
                            <MenuItem value={'all'}>Any Framework</MenuItem>
                            <MenuItem value={'angular'}>Angular</MenuItem>
                            <MenuItem value={'react'}>React</MenuItem>
                            <MenuItem value={'react-native'}>React Native</MenuItem>
                        </Select>
                    )}
                    <Select
                        value={releaseFilter}
                        variant={'standard'}
                        disableUnderline
                        onChange={(e): void => setReleaseFilter(e.target.value as Release)}
                        sx={styles.select}
                    >
                        {AVAILABLE_RELEASES.map((release) => (
                            <MenuItem key={release.name} value={release.name}>{`${release.name} (${release.quarter
                                .split('')
                                .reverse()
                                .join('')}${release.year.toString().substr(2)})`}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={statusFilter}
                        variant={'standard'}
                        disableUnderline
                        onChange={(e): void => setStatusFilter(e.target.value as Status | 'all')}
                        sx={styles.select}
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
                    <Box>
                        {loadingGroups.map((group, groupNumber) =>
                            group.map((item, i) => (
                                <Box
                                    key={`skeleton-group${groupNumber}-${i}`}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 2,
                                        marginTop: groupNumber > 0 && i === 0 ? 6 : 0,
                                    }}
                                >
                                    <Skeleton variant="circular" width={30} height={30} sx={{ flexShrink: 0 }} />
                                    <Box sx={{ marginLeft: 2, width: '100%' }}>
                                        <Skeleton variant="text" width="33%" height={20} />
                                        <Skeleton variant="text" width="66%" height={20} />
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                )}

                {!loading && (roadmapBuckets.length === 0 || results < 1) && (
                    <Box sx={styles.emptyStateWrapper}>
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
                    </Box>
                )}

                {!loading &&
                    roadmapBuckets.map((bucket, bIndex) => {
                        if (roadmapBuckets[bIndex].items.length < 1) return null;
                        return (
                            <Accordion key={`${bucket.name}_${bIndex}`} defaultExpanded>
                                <ExpansionHeader name={bucket.name} description={bucket.description} />
                                <AccordionDetails sx={{ display: 'block', padding: 0 }}>
                                    <Divider />
                                    <List sx={{ padding: 0 }}>
                                        {bucket.items.map((item, index): React.JSX.Element | null => {
                                            const statusColor = getStatusColor(item.status);
                                            return (
                                                <InfoListItem
                                                    key={`roadmap_item_${index}`}
                                                    hidePadding
                                                    divider={index === bucket.items.length - 1 ? undefined : 'full'}
                                                    title={<Typography sx={styles.title}>{item.name}</Typography>}
                                                    subtitle={item.description}
                                                    statusColor={statusColor ? statusColor[500] : ''}
                                                    wrapSubtitle
                                                    leftComponent={
                                                        <Box style={{ display: 'block' }}>
                                                            <Typography
                                                                variant={'subtitle2'}
                                                                align={'center'}
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    lineHeight: 1,
                                                                    marginBottom: 0.5,
                                                                }}
                                                            >
                                                                {item.quarter}
                                                            </Typography>
                                                            <Typography
                                                                variant={'caption'}
                                                                display={'block'}
                                                                align={'center'}
                                                                sx={{ color: Colors.gray[500], lineHeight: 1 }}
                                                            >
                                                                {item.year}
                                                            </Typography>
                                                        </Box>
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
