import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import color from 'color';
import { InfoListItem } from '@brightlayer-ui/react-components';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import { Close } from '@mui/icons-material';
import { ColorChips } from './ColorChips';
import { DRAWER_WIDTH } from '../../shared';
import { useAppDispatch, useAppSelector, changeSelectedColor, toggleColorContrast, RootState } from '../../redux';
import { useQueryString } from '../../hooks/useQueryString';
import { SystemStyleObject } from '@mui/system';

export const ColorBottomSheet: React.FC = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { category: queryCategory, name: queryName, weight: queryWeight } = useQueryString();
    const selectedColor = useAppSelector((state: RootState) => state.app.selectedColor);
    const showColorContrast = useAppSelector((state: RootState) => state.app.showColorContrast);
    const [hex, setHex] = useState<string | undefined>(undefined);
    const xsDown = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (queryCategory && queryName && queryWeight && !location.state?.fromColorSwatch) {
            dispatch(
                changeSelectedColor({
                    category: queryCategory as 'ui' | 'branding',
                    name: queryName,
                    weight: parseInt(queryWeight),
                })
            );
            const anchor = document.getElementById(`color-${queryCategory}-${queryName}-${queryWeight}`);
            if (anchor) {
                window.scrollTo({ top: anchor.offsetTop - 200 });
            }
        }
    }, [dispatch, queryCategory, queryName, queryWeight]);

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

    const handleChangeContrastToggle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(toggleColorContrast(e.target.checked));
        },
        [dispatch]
    );

    const dismissBottomSheet = useCallback(() => {
        void navigate(`${location.pathname}`, { replace: true });
        dispatch(changeSelectedColor(undefined));
        dispatch(toggleColorContrast(false));
    }, [navigate, location.pathname, dispatch]);

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
        <Drawer
            anchor={'bottom'}
            variant={'persistent'}
            open={!!selectedColor}
            PaperProps={{
                sx: (t): SystemStyleObject => ({
                    backgroundColor: color(t.palette.background.paper).fade(0.05).string(),
                    backdropFilter: 'blur(4px)',
                    zIndex: t.zIndex.drawer - 1,
                    left: { md: DRAWER_WIDTH },
                }),
            }}
        >
            <InfoListItem
                icon={
                    <Box
                        sx={[
                            {
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                border: '1px dashed',
                                borderColor: 'divider',
                            },
                            hex ? { backgroundColor: hex } : {},
                        ]}
                    />
                }
                title={
                    <Typography variant={'h6'} display={'inline'}>
                        {selectedColor?.name}[{selectedColor?.weight}]
                    </Typography>
                }
                sx={{ backgroundColor: 'unset' }}
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
                <Box sx={{ p: 2, pt: 0 }}>
                    <ColorChips type={'HEX'} hex={hex} />
                    <ColorChips type={'RGB'} hex={hex} />
                    <ColorChips type={'HSL'} hex={hex} />
                    <ColorChips type={'CMYK'} hex={hex} />
                    <Typography variant={'caption'} display={'block'}>
                        * Our colors are managed in hex / RGB. When converting to HSL or CMYK color spaces, some
                        fidelity might be lost.
                    </Typography>
                    {xsDown && <Divider sx={{ my: 1, mx: 0 }} />}
                    {xsDown && getColorContrastToggle()}
                </Box>
            )}
        </Drawer>
    );
};
