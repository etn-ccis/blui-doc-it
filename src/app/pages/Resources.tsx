import React, { useState } from 'react';
import {
    AppBar,
    Tabs,
    Tab,
    Theme,
    createStyles,
    makeStyles,
    List,
    ExpansionPanel,
    ExpansionPanelDetails,
    Divider,
} from '@material-ui/core';

import { PackageRow, ExampleRow, PageContent, ExpansionHeader } from '../components';

import { resources } from '../../__configuration__/resources';
import { usePageTitle } from '../hooks/usePageTitle';
import { FrameworkFilter } from '../../__types__';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabs: {
            top: theme.spacing(8),
            [theme.breakpoints.down('xs')]: {
                top: theme.spacing(7),
            },
        },
    })
);

export const Resources: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const [filter, setFilter] = useState<FrameworkFilter>('all');
    usePageTitle('Resources');

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
                {resources.map(
                    (bucket, bIndex) =>
                        (!bucket.applies ||
                            bucket.applies.includes(filter) ||
                            bucket.applies.includes('all') ||
                            filter === 'all') && (
                            <ExpansionPanel key={`${bucket.name}_${bIndex}`} defaultExpanded>
                                <ExpansionHeader name={bucket.name} description={bucket.description} />
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
            </PageContent>
        </>
    );
};
