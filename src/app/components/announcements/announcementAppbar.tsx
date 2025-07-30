import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { Close } from '@mui/icons-material';
import { Spacer } from '@brightlayer-ui/react-components';
import { getAnnouncementDetails } from '../../api';
import { AnnouncementData } from '../../../__types__';
import { useAppDispatch, hideBanner, showBanner } from '../../redux';
import * as Colors from '@brightlayer-ui/colors';
import DOMPurify from 'dompurify';

type BannerData = {
    bannerDismissed: boolean;
    id: number;
};
const styles: Record<string, SxProps> = {
    bannerContainer: {
        '& > a': {
            textDecoration: 'underline',
            cursor: 'pointer',
            color: Colors.white[50],
        },
    },
};

export const AnnouncementAppbar: React.FC = () => {
    const [announcementDetails, setAnnouncementDetails] = useState<AnnouncementData>();
    const environment = process.env.NODE_ENV;
    const [showBannerLocal, setShowBannerLocal] = useState(true);
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const getPreviousBanner = (): BannerData => {
        const announcementBannerData = window.sessionStorage.getItem('announcement_banner_data');
        const announcementBannerDetails = announcementBannerData ? JSON.parse(announcementBannerData) : undefined;
        return announcementBannerDetails;
    };

    const checkDateRange = (data: AnnouncementData): boolean => {
        const currentDate = new Date().toJSON().slice(0, 10);
        const from = new Date(data?.startDate);
        const to = new Date(data?.endDate);
        const check = new Date(currentDate);
        return check >= from && check <= to;
    };

    useEffect(() => {
        const loadAnnouncement = async (): Promise<void> => {
            const data = await getAnnouncementDetails();
            if (data === undefined) {
                dispatch(showBanner(false));
                return;
            }
            setAnnouncementDetails(data);
            const showData = checkDateRange(data);

            if (data && showData) {
                dispatch(showBanner(true));
            } else {
                dispatch(showBanner(false));
                setShowBannerLocal(false);
                return;
            }

            const previousBanner = getPreviousBanner();

            // If banner details are not set in session storage first time load
            if (previousBanner === undefined) {
                const announcementBannerData = {
                    bannerDismissed: false,
                    id: data.id,
                };
                sessionStorage.setItem('announcement_banner_data', JSON.stringify(announcementBannerData));
            } else {
                // Show banner again even if it is dismissed by user since data has been updated in database.
                if (previousBanner.id !== data.id) {
                    const announcementBannerData = {
                        bannerDismissed: false,
                        id: data.id,
                    };
                    sessionStorage.setItem('announcement_banner_data', JSON.stringify(announcementBannerData));
                } else if (previousBanner.bannerDismissed) {
                    // If user dissmissed banner, it will not display on page
                    dispatch(hideBanner());
                    setShowBannerLocal(false);
                }
            }
            // If devOnly flag is true, banner will not display in production environment
            if (data.devOnly && environment === 'production') {
                setShowBannerLocal(false);
            }
        };
        void loadAnnouncement();
    }, [dispatch, environment]);

    return (
        <>
            {announcementDetails && showBannerLocal && (
                <AppBar position="sticky" color={'secondary'} elevation={0}>
                    <Toolbar>
                        <Box
                            sx={styles.bannerContainer}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(announcementDetails?.bannerContent) }}
                        />
                        <Spacer />
                        <IconButton
                            style={{ marginRight: -Number(theme.spacing(1).replace('px', '')) }}
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch(hideBanner());
                                setShowBannerLocal(false);
                                sessionStorage.setItem(
                                    'announcement_banner_data',
                                    JSON.stringify({ bannerDismissed: true, id: announcementDetails.id })
                                );
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}
        </>
    );
};
