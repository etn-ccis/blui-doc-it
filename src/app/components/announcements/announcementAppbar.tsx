import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, useTheme, makeStyles, createStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Spacer } from '@brightlayer-ui/react-components';
import { getAnnouncementDetails } from '../../api';
import { AnnouncementData } from '../../../__types__';
import { HIDE_BANNER, SHOW_BANNER } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import * as Colors from '@brightlayer-ui/colors';
// import dompurify from 'dompurify';

const useStyles = makeStyles(() =>
    createStyles({
        bannerContainer: {
            '& > a': {
                textDecoration: 'underline',
                cursor: 'pointer',
                color: Colors.white[50],
            }
        } 
    })
);
export const AnnouncementAppbar: React.FC = () => {
    const [announcementDetails, setAnnouncementDetails] = useState<AnnouncementData>();
    const theme = useTheme();
    const classes = useStyles();
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
            if (data) {
                dispatch({ type: SHOW_BANNER, payload: show });
            } else {
                dispatch({ type: SHOW_BANNER, payload: false });
            }
        };
        void loadAnnoncement();
    }, []);

    return (
        <div>
            {announcementDetails && (
                <AppBar position="sticky" color={'secondary'} elevation={0}>
                    <Toolbar>
                        <div
                            className={classes.bannerContainer}
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            dangerouslySetInnerHTML={{__html: announcementDetails?.bannerContent}}
                            // dangerouslySetInnerHTML={sanitizedData(announcementDetails?.bannerContent)}
                        />
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
            )}
        </div>
    );
};
