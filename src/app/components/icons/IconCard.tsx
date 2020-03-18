import React, { ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import * as PXBColors from '@pxblue/colors';

// Material-UI Components
import Typography from '@material-ui/core/Typography';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

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

type IconCardProps = {
    component: ElementType;
    iconSize?: number | 'inherit';
    name?: string;
    showLabel?: boolean;
    style?: CSSProperties;
    selected?: boolean;
    className?: string;
};

export const IconCard: React.FC<IconCardProps> = (props): JSX.Element => {
    const classes = useStyles(props);

    const { component: Component, name, showLabel, style, selected, iconSize, className } = props;
    return (
        <div className={`${classes.wrapper} ${selected ? classes.selected : ''} + ${className}`} style={style}>
            <Component style={{ fontSize: iconSize }} />
            {showLabel && (
                <Typography title={name} variant="subtitle2" className={classes.label}>
                    {name}
                </Typography>
            )}
        </div>
    );
};

IconCard.defaultProps = {
    showLabel: true,
    selected: false,
    iconSize: 'inherit',
};
