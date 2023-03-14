import { Button, Typography, useTheme } from '@mui/material';
import React from 'react';

type InDocButtonProps = {
    title: string;
    href: string;
    caption?: string;
};

export const InDocButton: React.FC<InDocButtonProps> = (props) => {
    const { title, href, caption } = props;
    const theme = useTheme();
    return (
        <div style={{ marginBottom: theme.spacing(2) }}>
            <Button href={href} target={'_blank'} variant={'contained'} disableElevation color={'primary'}>
                {title}
            </Button>
            <Typography variant={'caption'} color={'textSecondary'} paragraph style={{ marginTop: theme.spacing() }}>
                {caption}
            </Typography>
        </div>
    );
};
