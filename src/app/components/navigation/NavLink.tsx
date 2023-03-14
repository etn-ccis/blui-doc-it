import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Box, SxProps, Theme } from '@mui/material';

type NavLinkProps = LinkProps & {
    title: string;
    to: string;
    hoverColor?: string;
    sx?: SxProps<Theme>;
};
export const NavLink: React.FC<NavLinkProps> = (props): JSX.Element => (
    <Box
        component={Link}
        sx={{
            fontWeight: 400,
            textDecoration: 'none',
            fontSize: '0.875rem',
            color: '#ffffff',
            ml: 2,
            '&:hover': {
                color: props.hoverColor || '',
            },
            ...props.sx,
        }}
        rel="noopener noreferrer"
        to={props.to}
    >
        {props.title}
    </Box>
);
NavLink.displayName = 'NavLink';
