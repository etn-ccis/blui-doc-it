/* eslint-disable */

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Drawer,
    FormControlLabel,
    IconButton,
    makeStyles,
    Switch,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import color from 'color';
import { InfoListItem } from '@brightlayer-ui/react-components';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import { Close } from '@material-ui/icons';
import { ColorChips } from './ColorChips';
import { DRAWER_WIDTH } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { CHANGE_SELECTED_COLOR, TOGGLE_COLOR_CONTRAST } from '../../redux/actions';
import { useQueryString } from '../../hooks/useQueryString';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        backgroundColor: color(theme.palette.background.paper).fade(0.05).string(),
        backdropFilter: 'blur(4px)',
        zIndex: theme.zIndex.drawer - 1,
        [theme.breakpoints.up('md')]: {
            left: DRAWER_WIDTH,
        },
    },
    header: {
        backgroundColor: 'unset',
    },
    colorAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: '50%',
        border: `1px dashed ${theme.palette.divider}`,
    },
    body: { padding: theme.spacing(2), paddingTop: 0 },
}));

export const ColorBottomSheet: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const history = useHistory();
    const { category: queryCategory, name: queryName, weight: queryWeight } = useQueryString();
    const selectedColor = useSelector((state: AppState) => state.app.selectedColor);
    const showColorContrast = useSelector((state: AppState) => state.app.showColorContrast);
    const [hex, setHex] = useState<string | undefined>(undefined);
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        if (queryCategory) {
            dispatch({
                type: CHANGE_SELECTED_COLOR,
                payload: { category: queryCategory, name: queryName, weight: queryWeight },
            });
            const anchor = document.getElementById(`color-${queryCategory}-${queryName}-${queryWeight}`);
            if (anchor) {
                window.scrollTo({ top: anchor.offsetTop - 200 });
            }
        }
    }, []);

    useEffect(() => {
        if (selectedColor) {
            if (selectedColor.category === 'ui') {
                // @ts-expect-error
                setHex(Colors[selectedColor.name][selectedColor.weight]);
            } else {
                // @ts-expect-error
                setHex(BrandingColors[selectedColor.name][selectedColor.weight]);
            }
        } else {
            setHex(undefined);
        }
    }, [selectedColor]);

    const handleChangeContrastToggle = useCallback((e) => {
        dispatch({ type: TOGGLE_COLOR_CONTRAST, payload: e.target.checked });
    }, []);

    const dismissBottomSheet = useCallback(() => {
        history.replace(`${location.pathname}`);
        dispatch({ type: CHANGE_SELECTED_COLOR, payload: false });
        dispatch({ type: TOGGLE_COLOR_CONTRAST, payload: false });
    }, [history]);

    const getColorContrastToggle = useCallback(
        () => (
            <FormControlLabel
                control={<Switch name={'contrast-switch'} color={'secondary'} />}
                label={'View Color Contrast'}
                title={'View Contrast against Other Colors'}
                onChange={handleChangeContrastToggle}
                checked={showColorContrast}
            />
        ),
        [showColorContrast]
    );

    return (
        <Drawer anchor={'bottom'} variant={'persistent'} open={!!selectedColor} classes={{ paper: classes.paper }}>
            <InfoListItem
                icon={<div className={classes.colorAvatar} style={hex ? { backgroundColor: hex } : undefined} />}
                title={
                    <Typography variant={'h6'} display={'inline'}>
                        {selectedColor?.name}[{selectedColor?.weight}]
                    </Typography>
                }
                className={classes.header}
                subtitle={selectedColor?.category === 'ui' ? 'UI / Status Color' : 'Branding Color'}
                rightComponent={
                    <>
                        {!xsDown && getColorContrastToggle()}
                        <IconButton edge={'end'} onClick={dismissBottomSheet}>
                            <Close />
                        </IconButton>
                    </>
                }
            />
            {hex && (
                <div className={classes.body}>
                    <ColorChips type={'HEX'} hex={hex} />
                    <ColorChips type={'RGB'} hex={hex} />
                    <ColorChips type={'HSL'} hex={hex} />
                    <ColorChips type={'CMYK'} hex={hex} />
                    <ColorChips type={'PANTONE'} hex={hex} />
                    <Typography variant={'caption'} display={'block'}>
                        * Our colors are managed in hex / RGB. When converting to HSL, CMYK or Pantone color spaces,
                        some fidelity might be lost.
                    </Typography>
                    {xsDown && getColorContrastToggle()}
                </div>
            )}
        </Drawer>
    );
};
