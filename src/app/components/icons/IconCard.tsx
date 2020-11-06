/*eslint-disable */
import React, { ElementType } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import color from 'color';
// Material-UI Components
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { IconType } from '../../../__types__';
import { unCamelCase } from '../../shared';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        height: 137,
        width: 137,
    },
    selected: {
        background: color(theme.palette.primary.main)
            .fade(0.9)
            .string(),
        color: theme.palette.primary.main,
    },
    label: {
        width: '100%',
        textAlign: 'center',
        wordBreak: 'break-word',
        marginTop: '5px',
    },
}));

type IconCardProps = {
    component: ElementType;
    icon: IconType;
};

export const IconCard: React.FC<IconCardProps> = (props): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
   // const history = useHistory();
    const { component: Component, icon } = props;
    const selected = useSelector((state: AppState) => state.app.selectedIcon === icon);

    return (
        <div
            className={clsx(classes.wrapper, { [classes.selected]: selected })}
            onClick={(): void => {
                dispatch({ type: 'SELECTION', payload: icon });
                // @ts-ignore
                document.getElementById('pxb-iconography-page').style.marginRight = '350px';
                // Adding in the history is causing performance issues.  Maybe add a share button to the IconDrawer.
               // history.replace(`${location.pathname}?icon=${icon.name}&isMaterial=${icon.isMaterial.toString()}`);
            }}
        >
            {Component && <Component style={{ fontSize: 36 }} />}
            <Typography variant="subtitle2" className={classes.label} color={selected ? 'primary' : 'textPrimary'}>
                {unCamelCase(icon.name)}
            </Typography>
        </div>
    );
};
