import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Feedback } from '@mui/icons-material';
import Fab from '@mui/material/Fab';

export const ContactFab = (): JSX.Element | null => {
    const navigate = useNavigate();
    const location = useLocation();
    const isContactPage = location.pathname === '/community/contactus';

    return !isContactPage ? (
        <Fab
            color={'primary'}
            aria-label={'Contact Us'}
            sx={{
                zIndex: 2,
                position: 'fixed',
                bottom: 24,
                right: 24,
                boxShadow: 10,
            }}
            onClick={(): void => {
                void navigate('/community/contactus');
            }}
        >
            <Feedback />
        </Fab>
    ) : null;
};
