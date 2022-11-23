import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Divider,
    Drawer,
    FormControlLabel,
    IconButton,
    Switch,
    SxProps,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import color from 'color';
import { InfoListItem } from '@brightlayer-ui/react-components';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import { Close } from '@mui/icons-material';
import { ColorChips } from './ColorChips';
import { DRAWER_WIDTH } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { CHANGE_SELECTED_COLOR, TOGGLE_COLOR_CONTRAST } from '../../redux/actions';
import { useQueryString } from '../../hooks/useQueryString';

const styles: { [key: string]: SxProps<Theme> } = {
    paper: (theme) => ({
        backgroundColor: color(theme.palette.background.paper).fade(0.05).string(),
        backdropFilter: 'blur(4px)',
        zIndex: theme.zIndex.drawer - 1,
        [theme.breakpoints.up('md')]: {
            left: DRAWER_WIDTH,
        },
    }),
    header: {
        backgroundColor: 'unset',
    },
    colorAvatar: (theme) => ({
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: '50%',
        border: `1px dashed ${theme.palette.divider}`,
    }),
    body: { p: 2, paddingTop: 0 },
};

export const ColorBottomSheet: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { category: queryCategory, name: queryName, weight: queryWeight } = useQueryString();
    const selectedColor = useSelector((state: AppState) => state.app.selectedColor);
    const showColorContrast = useSelector((state: AppState) => state.app.showColorContrast);
    const [hex, setHex] = useState<string | undefined>(undefined);
    const xsDown = useMediaQuery(theme.breakpoints.down('sm'));

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

    const handleChangeContrastToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: TOGGLE_COLOR_CONTRAST, payload: e.target.checked });
    }, []);

    const dismissBottomSheet = useCallback(() => {
        navigate(`${location.pathname}`, { replace: true });
        dispatch({ type: CHANGE_SELECTED_COLOR, payload: false });
        dispatch({ type: TOGGLE_COLOR_CONTRAST, payload: false });
    }, [history]);

    const getColorContrastToggle = useCallback(
        () => (
            <FormControlLabel
                control={<Switch name={'contrast-switch'} color={'secondary'} />}
                label={'View Color Contrast'}
                title={'View Contrast against Other Colors'}
                // @ts-ignore TODO: sort out these types
                onChange={handleChangeContrastToggle}
                checked={showColorContrast}
            />
        ),
        [showColorContrast]
    );

    return (
        <Drawer anchor={'bottom'} variant={'persistent'} open={!!selectedColor} PaperProps={{ sx: styles.paper }}>
            <InfoListItem
                icon={<Box sx={{ ...styles.colorAvatar, ...(hex ? { backgroundColor: hex } : {}) }} />}
                title={
                    <Typography variant={'h6'} display={'inline'}>
                        {selectedColor?.name}[{selectedColor?.weight}]
                    </Typography>
                }
                sx={styles.header}
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
                <Box sx={styles.body}>
                    <ColorChips type={'HEX'} hex={hex} />
                    <ColorChips type={'RGB'} hex={hex} />
                    <ColorChips type={'HSL'} hex={hex} />
                    <ColorChips type={'CMYK'} hex={hex} />
                    <Typography variant={'caption'} display={'block'}>
                        * Our colors are managed in hex / RGB. When converting to HSL or CMYK color spaces, some
                        fidelity might be lost.
                    </Typography>
                    {xsDown && <Divider style={{ margin: `${theme.spacing()}px 0` }} />}
                    {xsDown && getColorContrastToggle()}
                </Box>
            )}
        </Drawer>
    );
};
