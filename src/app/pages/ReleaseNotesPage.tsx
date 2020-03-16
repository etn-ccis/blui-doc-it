import React, { useEffect } from 'react';
import {
    Typography,
    useTheme,
} from '@material-ui/core';
import { LatestReleases } from '../../docs';
import * as Colors from '@pxblue/colors';

import { Spacer } from '@pxblue/react-components';
import { ReleaseInfo } from '../../docs/release-notes';
import { CHANGE_PAGE_TITLE } from '../redux/actions';
import { useDispatch } from 'react-redux';

export const ReleaseNotesPage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: 'Release Notes' });
    }, [dispatch]);

    return (
        <>
            <div style={{ padding: 20, margin: '0 auto', maxWidth: 1024 }}>
                <Typography style={{ marginTop: theme.spacing(2), color: Colors.gray[500] }}>
                    Get the latest updates on guidelines, components, and documentation across platforms.
                </Typography>
                {LatestReleases.map((item: ReleaseInfo) => (
                    <div key={item.title} style={{ color: Colors.gray[500], textAlign: 'left' }}>
                        <div style={{ marginTop: theme.spacing(2), display: 'flex' }}>
                            <Typography variant={'h6'} color={'primary'}>
                                {item.title}
                            </Typography>
                            <Spacer />
                            <Typography color={'inherit'}>{item.date}</Typography>
                        </div>
                        <Typography variant={'subtitle2'}>{`v${item.version}`}</Typography>
                        {item.summary}
                    </div>
                ))}
            </div>
        </>
    );
};
