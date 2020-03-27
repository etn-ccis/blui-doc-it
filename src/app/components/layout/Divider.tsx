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
            margin: `${theme.spacing(3)}px -100vw`,
        },
    })
);

export const Divider: React.FC<DividerProps> = (props): JSX.Element => {
    const { fullScreen, ...DividerProps } = props;
    const classes = useStyles();
    return <MuiDivider classes={fullScreen && classes} {...DividerProps} />;
};
