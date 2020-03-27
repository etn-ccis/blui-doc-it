import React from 'react';
import {
    Divider as MuiDivider,
    DividerProps as MuiDividerProps,
    Theme,
    createStyles,
    makeStyles,
} from '@material-ui/core';

type DividerProps = MuiDividerProps & {
    fullScreen?: true;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: `100%`,
            margin: `${theme.spacing(12)}px 0`,
        },
    })
);

export const Divider: React.FC<DividerProps> = (props): JSX.Element => {
    const classes = useStyles();
    return <MuiDivider classes={classes} {...props} />;
};
