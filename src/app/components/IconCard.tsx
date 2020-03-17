import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import * as PXBColors from '@pxblue/colors';

// Material-UI Components
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: any) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: PXBColors.black[900],
    },
    selected: {
        background: theme.palette.primary['50'],
    },
    label: {
        cursor: 'default',
        width: '100%',
        textAlign: 'center',
        wordBreak: 'break-word',
        marginTop: '5px',
        color: '#1d2529',
    },
}));

export const IconCard = (props: any): JSX.Element => {
    const classes = useStyles(props);

    const { component: Component, name, showLabel = true, style, selected = false, iconSize = 'inherit' } = props;
    return (
        <div className={`${classes.wrapper} ${selected ? classes.selected : ''}`} style={style}>
            <Component style={{ fontSize: iconSize }} />
            {showLabel && (
                <Typography title={name} variant="subtitle2" className={classes.label}>
                    {name}
                </Typography>
            )}
        </div>
    );
};
