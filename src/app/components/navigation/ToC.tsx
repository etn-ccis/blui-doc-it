import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DRAWER_WIDTH } from '../../shared';

type ToCProps = {
    anchors: Array<{ title: string; hash: string }>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: `0 ${theme.spacing(2)}px`,
            margin: `${theme.spacing(2)}px 0`,
            [theme.breakpoints.up('xl')]: {
                borderLeft: 'none',
                padding: `${theme.spacing(5)}px ${theme.spacing(3)}px`,
                margin: 0,
                position: 'fixed',
                top: theme.spacing(8),
                left: DRAWER_WIDTH,
            },
        },
        onThisPage: {
            display: 'block',
            marginBottom: theme.spacing(2),
        },
        linkWrapper: {
            marginBottom: theme.spacing(),
        },
        link: {
            textDecoration: 'none',
            color: theme.palette.text.primary,
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
                <div key={index} className={classes.linkWrapper}>
                    <Link to={anchor.hash} className={classes.link}>
                        {anchor.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};
