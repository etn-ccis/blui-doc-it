import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { LatestReleases } from '../../docs';
import * as Colors from '@pxblue/colors';
import { ReleaseInfo } from '../../docs/release-notes';
import { PageContent } from '../components';
import { useBackgroundColor } from '../hooks/useBackgroundColor';
import { usePageTitle } from '../hooks/usePageTitle';

export const ReleaseNotes: React.FC = (): JSX.Element => {
    const theme = useTheme();
    usePageTitle('Release Notes');
    useBackgroundColor(Colors.white[50]);

    return (
        <PageContent backgroundColor={Colors.white[50]}>
            {LatestReleases.map((item: ReleaseInfo) => (
                <div
                    key={item.title}
                    style={{ marginBottom: theme.spacing(16) }}
                >
                    <Typography
                        variant={'h4'}
                        color={'primary'}
                        style={{ marginTop: theme.spacing(2), display: 'flex' }}
                    >
                        {item.date}
                    </Typography>
                    <Typography color={'inherit'} variant={'h6'}>{`v${item.version} (${item.title})`}</Typography>
                    {item.details}
                </div>
            ))}
        </PageContent>
    );
};
