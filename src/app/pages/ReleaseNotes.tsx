import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { LatestReleases } from '../../docs';
import { ReleaseInfo } from '../../docs/release-notes';
import { PageContent, Divider } from '../components';
import { usePageTitle } from '../hooks/usePageTitle';
import { useGoogleAnalyticsPageView } from '../hooks/useGoogleAnalyticsPageView';

export const ReleaseNotes: React.FC = (): JSX.Element => {
    const theme = useTheme();
    usePageTitle('Release Notes');
    useGoogleAnalyticsPageView();
    console.log('Release Notes', theme.palette.background.paper, theme.palette.mode);

    return (
        <PageContent backgroundColor={theme.palette.background.paper}>
            {LatestReleases.map((item: ReleaseInfo, index: number) => (
                <div key={item.title} style={{ marginBottom: theme.spacing(16) }}>
                    <Typography variant={'h4'} color={'primary'} style={{ marginTop: theme.spacing(4) }}>
                        {item.date}
                    </Typography>
                    <Typography
                        color={'textSecondary'}
                        variant={'h6'}
                        style={{ marginBottom: theme.spacing() }}
                    >{`v${item.version} (${item.title})`}</Typography>
                    {item.details}
                    {index !== LatestReleases.length - 1 && <Divider />}
                </div>
            ))}
        </PageContent>
    );
};
