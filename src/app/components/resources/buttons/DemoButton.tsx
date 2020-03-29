import React, { ComponentProps } from 'react';
import { IconButton, Badge, makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import * as Colors from '@pxblue/colors';
import { LiveDemo } from '../../../assets/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconButton: {
            color: Colors.gray[500],
            padding: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
        badge: {
            fontWeight: 600,
        },
        demo: {
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
    })
);

type DemoButtonProps = ComponentProps<'div'> & {
    small: boolean;
    link: string;
    count: number;
};
export const DemoButton: React.FC<DemoButtonProps> = (props) => {
    const { small, count, link, style, ...other } = props;
    const classes = useStyles();

    return !small ? (
        <IconButton
            title={'Live Example'}
            className={clsx(classes.iconButton, classes.demo)}
            onClick={(): void => {
                window.open(link, '_blank');
            }}
        >
            <Badge
                style={{ fontWeight: 600 }}
                badgeContent={count}
                color={'default'}
                classes={{ badge: classes.badge }}
            >
                <LiveDemo />
            </Badge>
        </IconButton>
    ) : (
        <div
            style={Object.assign({ cursor: 'pointer', display: 'flex', alignItems: 'center' }, style)}
            onClick={(): void => {
                window.open(link, '_blank');
            }}
            {...other}
        >
            <LiveDemo fontSize={'small'} htmlColor={Colors.blue[400]} />
            {count !== undefined && count > 0 && (
                <Typography style={{ color: Colors.blue[500], fontSize: 12 }}>{count}</Typography>
            )}
        </div>
    );
};
