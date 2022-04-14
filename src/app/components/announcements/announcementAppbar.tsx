import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, useTheme } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Spacer } from '@brightlayer-ui/react-components';
import { getAnnouncementDetails } from '../../api';
import { AnnouncementData } from '../../../__types__';
import { HIDE_BANNER, SHOW_BANNER } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const AnnouncementAppbar: React.FC = () => {
    const [announcementDetails, setAnnouncementDetails] = useState<AnnouncementData>();
    const [navigateBlui, setNavigateBlui] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadAnnoncement = async (): Promise<void> => {
            const data = await getAnnouncementDetails();
            setAnnouncementDetails(data);

            const currentDate = new Date().toJSON().slice(0, 10);
            const from = new Date('2022/04/14');
            const to = new Date('2022/04/24');
            const check = new Date(currentDate);
            const show = check > from && check < to;
            dispatch({ type: SHOW_BANNER, payload: show });
        };
        void loadAnnoncement();
    }, []);
    return (
        <AppBar position="sticky" color={'secondary'} elevation={0}>
            <Toolbar>
                {navigateBlui && <Redirect to="/migration" push />}
                <div>
                    {announcementDetails?.content}
                    <a
                        style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                        onClick={(): any => {
                            setNavigateBlui(true);
                            dispatch({ type: HIDE_BANNER });
                            sessionStorage.setItem('banner-dismissed', 'true');
                        }}
                    >
                        {announcementDetails?.linkContent}
                    </a>
                    .
                </div>
                <Spacer />
                <IconButton
                    style={{ marginRight: -theme.spacing(1) }}
                    color={'inherit'}
                    onClick={(): void => {
                        dispatch({ type: HIDE_BANNER });
                        sessionStorage.setItem('banner-dismissed', 'true');
                    }}
                >
                    <Close />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
