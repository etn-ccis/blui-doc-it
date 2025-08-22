import React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DialogDemo: React.JSX.Element = (
    <Paper elevation={16} sx={{ maxWidth: 320, my: 8, mx: 2 }}>
        <DialogTitle>Enjoy Brightlayer UI so far?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color={'primary'}>I love it</Button>
            <Button color={'primary'}>Of course</Button>
        </DialogActions>
    </Paper>
);
