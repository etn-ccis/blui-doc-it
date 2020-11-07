/* eslint-disable */
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
import { SELECT_ICON } from '../../redux/actions';

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

export const IconCard: React.FC<IconCardProps> = (props): JSX.Element | null => {
    const { component: Component, icon } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const history = useHistory();
    const showIcon = useSelector((state: AppState) => {
        const searchQuery = (state.app.iconSearch || '').toLocaleLowerCase().trim();
        if(!searchQuery) return true;
        if(searchQuery.length < 3) return true;
        if(icon.name.toLocaleLowerCase().includes(searchQuery)){
            return true;
        }
        for(const tag of icon.tags){
            if(tag.toLocaleLowerCase().includes(searchQuery)) return true;
        }
        return false;
    });
    const selected = useSelector((state: AppState) => state.app.selectedIcon === icon);

    // eslint-disable-next-line
    // console.log('rendering icon card');
    // if(!showIcon) return null;
    return (
        <div
            className={clsx(classes.wrapper, { [classes.selected]: selected })}
            onClick={(): void => {
                dispatch({ type: SELECT_ICON, payload: icon });
                // Adding in the history is causing performance issues.  Maybe add a share button to the IconDrawer.
                // history.replace(`${location.pathname}?icon=${icon.name}&isMaterial=${icon.isMaterial.toString()}`);
            }}
            style={{display: showIcon ? 'flex' : 'none'}}
        >
            {/* {Component && <Component style={{ fontSize: 36 }} />} */}
            <Typography variant="subtitle2" className={classes.label} color={selected ? 'primary' : 'textPrimary'}>
                {unCamelCase(icon.name)}
            </Typography>
        </div>
    );
};
