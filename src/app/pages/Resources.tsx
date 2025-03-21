import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

import { ResourceRow, PageContent, ExpansionHeader } from '../components';
import { resources } from '../../__configuration__/resources';
import { usePageTitle } from '../hooks/usePageTitle';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';
import { FrameworkFilter } from '../../__types__';
import { useBackgroundColor } from '../hooks/useBackgroundColor';

export const DevResources: React.FC = (): JSX.Element => {
    const [filter, setFilter] = useState<FrameworkFilter>('all');
    const searchActive = useSelector((state: AppState) => state.app.searchActive);
    const theme = useTheme();
    const showBanner = useSelector((state: AppState) => state.app.showBanner);

    usePageTitle('Resources');
    useGoogleAnalyticsPageView();
    useBackgroundColor(theme.palette.background.default);
    return (
        <>
            <AppBar
                position={searchActive ? 'static' : 'sticky'} // to avoid the filter bar "pops out" when searching
                color={'secondary'}
                sx={{
                    // double the position if the banner is shown
                    top: showBanner ? { xs: 2 * 56, sm: 2 * 64 } : { xs: 56, sm: 64 },
                }}
                elevation={0}
            >
                <Tabs variant={'scrollable'} value={filter}>
                    <Tab sx={{ minWidth: 'auto' }} label="All" value={'all'} onClick={(): void => setFilter('all')} />
                    <Tab
                        sx={{ minWidth: 'auto' }}
                        label="Angular"
                        value={'angular'}
                        onClick={(): void => setFilter('angular')}
                    />
                    <Tab
                        sx={{ minWidth: 'auto' }}
                        label="React"
                        value={'react'}
                        onClick={(): void => setFilter('react')}
                    />
                    <Tab
                        sx={{ minWidth: 'auto' }}
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
                            <Accordion key={`${bucket.name}_${bIndex}`} defaultExpanded>
                                <ExpansionHeader name={bucket.name} description={bucket.description} />
                                <AccordionDetails sx={{ display: 'block', p: 0 }}>
                                    <Divider />
                                    <List sx={{ p: 0 }}>
                                        {bucket.items.map((item, index): JSX.Element | null =>
                                            item.applies === undefined ||
                                            item.applies.includes(filter) ||
                                            item.applies.includes('all') ||
                                            filter === 'all' ? (
                                                <ResourceRow
                                                    key={`${item.name}_${index}`}
                                                    name={item.name}
                                                    package={item.package}
                                                    repository={item.repository || ''}
                                                    description={item.description}
                                                    divider={index < bucket.items.length - 1}
                                                    demoUrl={item.demoUrl}
                                                    workSpace={item.workSpace}
                                                />
                                            ) : null
                                        )}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        )
                )}
            </PageContent>
        </>
    );
};
