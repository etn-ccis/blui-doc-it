import React, { useEffect } from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { LatestReleases } from '../../docs';
import * as Colors from '@pxblue/colors';
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
                {LatestReleases.map((item: ReleaseInfo) => (
                    <div key={item.title} style={{ color: Colors.gray[500], textAlign: 'left', marginBottom: theme.spacing(16) }}>
                        <Typography variant={'h4'} color={'primary'} style={{ marginTop: theme.spacing(2), display: 'flex' }}>
                            {item.date}
                        </Typography>
                        <Typography color={'inherit'} variant={'h6'}>{`v${item.version} (${item.title})` }</Typography>
                        {item.details}
                    </div>
                ))}
            </div>
        </>
    );
};
