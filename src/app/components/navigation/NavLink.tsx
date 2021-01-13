import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontWeight: 400,
            textDecoration: 'none',
            color: '#ffffff',
            marginLeft: theme.spacing(2),
            '&:hover': {
                color: (props: NavLinkProps): string => props.hoverColor || '',
            },
        },
    })
);

type NavLinkProps = LinkProps & {
    title: string;
    to: string;
    hoverColor?: string;
};
export const NavLink: React.FC<NavLinkProps> = (props): JSX.Element => {
    const classes = useStyles(props);
    return (
        <Link
            style={props.style}
            rel="noopener noreferrer"
            className={clsx(classes.root, props.className)}
            to={props.to}
        >
            {props.title}
        </Link>
    );
};
NavLink.displayName = 'NavLink';
