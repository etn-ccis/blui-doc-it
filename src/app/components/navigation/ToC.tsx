import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DRAWER_WIDTH, TOC_WIDTH, PAGE_WIDTH } from '../../shared';

type ToCProps = {
    anchors: Array<{ title: string; hash: string }>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: `0 ${theme.spacing(2)}px`,
            margin: `${theme.spacing(2)}px 0`,
            maxWidth: TOC_WIDTH,
            [theme.breakpoints.up('lg')]: {
                borderLeft: 'none',
                padding: `${theme.spacing(5)}px ${theme.spacing(3)}px`,
                margin: 0,
                position: 'fixed',
                top: theme.spacing(8),
                left: `calc(50% + ${DRAWER_WIDTH}px*0.5 - ${TOC_WIDTH}px*0.5 - ${PAGE_WIDTH.REGULAR}px*0.5)`,
            },
        },
        onThisPage: {
            display: 'block',
            marginBottom: theme.spacing(2),
        },
        link: {
            marginBottom: theme.spacing(),
            textDecoration: 'none',
            color: theme.palette.text.primary,
            display: 'block',
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
    })
);

export const ToC: React.FC<ToCProps> = (props) => {
    const { anchors } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.onThisPage} variant={'overline'} color={'textSecondary'}>
                On This Page
            </Typography>
            {anchors.map((anchor, index) => (
                <Link key={index} to={anchor.hash} className={classes.link}>
                    {anchor.title}
                </Link>
            ))}
        </div>
    );
};
