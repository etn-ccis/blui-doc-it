import React, { useState, useCallback } from 'react';
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
} from '@material-ui/core';

import { PageContent, ExpansionHeader } from '../components';

import { roadmap, Status, RoadmapItem, Quarter } from '../../__configuration__/roadmap';
import { usePageTitle } from '../hooks/usePageTitle';
import { FrameworkFilter } from '../../__types__';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';

import * as Colors from '@pxblue/colors';
import { PXBlueColor } from '../components/colors/Colors';
import { useBackgroundColor } from '../hooks/useBackgroundColor';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        secondaryToolbar: {
            top: theme.spacing(8),
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
    })
);

const getStatusColor = (status: Status): PXBlueColor | undefined => {
    switch (status) {
        case 'finished':
            return Colors.green;
        case 'in-progress':
            return Colors.blue;
        case 'backlog':
        default:
            return undefined;
    }
};

export const Roadmap: React.FC = (): JSX.Element => {
    usePageTitle('Roadmap');
    useBackgroundColor(Colors.gray[50]);
    const classes = useStyles();
    const [frameworkFilter, setFrameworkFilter] = useState<FrameworkFilter>('all');
    const [quarterFilter, setQuarterFilter] = useState<Quarter | 'Quarter'>('Quarter');

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
        [classes]
    );

    const filteredBuckets = roadmap.filter(
        (bucket) =>
            !bucket.applies ||
            bucket.applies.includes(frameworkFilter) ||
            bucket.applies.includes('all') ||
            frameworkFilter === 'all'
    );

    return (
        <>
            <AppBar position="sticky" color={'default'} className={classes.secondaryToolbar} elevation={0}>
                <Toolbar>
                    <Select
                        value={frameworkFilter}
                        disableUnderline
                        style={{ minWidth: 100, alignSelf: 'stretch' }}
                        onChange={(e): void => setFrameworkFilter(e.target.value as FrameworkFilter)}
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
                        style={{ marginLeft: 16, minWidth: 100, alignSelf: 'stretch' }}
                        onChange={(e): void => setQuarterFilter(e.target.value as Quarter)}
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
                {filteredBuckets.map((bucket, bIndex) => {
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
                                                    <Typography className={classes.title} noWrap>
                                                        {item.name}
                                                    </Typography>
                                                }
                                                subtitle={item.description}
                                                statusColor={statusColor ? statusColor[500] : undefined}
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
