import React from 'react';
import {
    Divider as MuiDivider,
    DividerProps as MuiDividerProps,
    Theme,
    createStyles,
    makeStyles,
} from '@material-ui/core';
import { PAGE_WIDTH } from '../../shared';

type DividerProps = MuiDividerProps & {
    wide?: true;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: (props: DividerProps): number => (props.wide ? PAGE_WIDTH.WIDE : PAGE_WIDTH.REGULAR),
            margin: `${theme.spacing(5)}px auto`,
        },
    })
);

export const Divider: React.FC<DividerProps> = (props): JSX.Element => {
    const classes = useStyles(props);
    return <MuiDivider classes={classes} {...props} />;
};
