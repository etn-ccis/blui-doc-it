import React, { ElementType } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// Material-UI Components
import Typography from '@material-ui/core/Typography';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.text.primary,
    },
    selected: {
        background: theme.palette.primary.light,
    },
    label: {
        width: '100%',
        textAlign: 'center',
        wordBreak: 'break-word',
        marginTop: '5px',
        color: theme.palette.text.primary,
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
    const classes = useStyles();

    const { component: Component, name, showLabel, style, selected, iconSize, className } = props;
    return (
        <div className={clsx(classes.wrapper, { [classes.selected]: selected }, className)} style={style}>
            <Component style={{ fontSize: iconSize, maxWidth: 84 }} />
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
