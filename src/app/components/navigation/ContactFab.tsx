import React from 'react';
import { useHistory } from 'react-router-dom';
import { Feedback } from '@material-ui/icons';
import { makeStyles, createStyles, Fab, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
            boxShadow: theme.shadows[10],
        },
    })
);

export const ContactFab = (): JSX.Element | null => {
    const classes = useStyles();
    const history = useHistory();
    const isContactPage = history.location.pathname === '/community/contactus';

    return !isContactPage ? (
        <Fab
            color={'primary'}
            aria-label={'Contact Us'}
            className={classes.fab}
            onClick={(): void => {
                history.push('/community/contactus');
            }}
        >
            <Feedback />
        </Fab>
    ) : null;
};
