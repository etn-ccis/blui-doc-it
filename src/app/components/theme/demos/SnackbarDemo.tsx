import React from 'react';
import { IconButton, Snackbar } from '@mui/material';
import { Delete } from '@mui/icons-material';

export const SnackbarDemo: JSX.Element = (
    <div style={{ padding: 16 }}>
        <Snackbar
            open={true}
            message={'This is a snackbar, a.k.a. toast.'}
            action={
                <IconButton size={'small'} color={'inherit'}>
                    <Delete />
                </IconButton>
            }
            style={{ position: 'static', transform: 'none' }}
        />
    </div>
);
