import React from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

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
