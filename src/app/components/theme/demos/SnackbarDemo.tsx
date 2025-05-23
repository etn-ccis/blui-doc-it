import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { Delete } from '@mui/icons-material';

export const SnackbarDemo: JSX.Element = (
    <Box sx={{ p: 2 }}>
        <Snackbar
            open={true}
            message={'This is a snackbar, a.k.a. toast.'}
            action={
                <IconButton size={'small'} color={'inherit'}>
                    <Delete />
                </IconButton>
            }
            sx={{ position: 'static', transform: 'none' }}
        />
    </Box>
);
