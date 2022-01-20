/* eslint-disable */

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Chip,
    Drawer,
    FormControlLabel,
    IconButton,
    makeStyles,
    Switch,
    Theme,
    Typography,
    useTheme,
} from '@material-ui/core';
import color from 'color';
import { InfoListItem } from '@brightlayer-ui/react-components';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import { Close } from '@material-ui/icons';
import { ColorChips } from './ColorChips';
import { DRAWER_WIDTH } from '../../shared';

type ColorType = undefined | { category: 'ui' | 'branding'; name: string; code: number };
const COLOR_SELECTED: ColorType = { category: 'branding', name: 'wine', code: 500 };

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
    const [hex, setHex] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (COLOR_SELECTED) {
            if (COLOR_SELECTED.category === 'ui') {
                // @ts-expect-error
                setHex(Colors[COLOR_SELECTED.name][COLOR_SELECTED.code]);
            } else {
                // @ts-expect-error
                setHex(BrandingColors[COLOR_SELECTED.name][COLOR_SELECTED.code]);
            }
        } else {
            setHex(undefined);
        }
    }, []);
    const getHeaderTitle = useCallback(
        () => (
            <>
                <Typography color="textSecondary" variant={'h6'} display={'inline'}>
                    {COLOR_SELECTED.category === 'ui' ? 'UIColors.' : 'BrandingColors.'}
                </Typography>
                <Typography variant={'h6'} display={'inline'}>
                    {COLOR_SELECTED.name}[{COLOR_SELECTED.code}]
                </Typography>
            </>
        ),
        []
    );
    return (
        <Drawer
            anchor={'bottom'}
            open={COLOR_SELECTED !== undefined}
            variant={'permanent'}
            classes={{ paper: classes.paper }}
        >
            <InfoListItem
                icon={<div className={classes.colorAvatar} style={hex ? { backgroundColor: hex } : undefined} />}
                title={getHeaderTitle()}
                className={classes.header}
                subtitle={'Used as: primary theme color'}
                rightComponent={
                    <>
                        <FormControlLabel
                            control={<Switch name={'contrast-switch'} color={'secondary'} />}
                            label={'View Contrast'}
                            title={'View Contrast against Other Colors'}
                        />
                        <IconButton edge={'end'}>
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
                        * Our colors are stored in hex / RGB. When converting to HSL, CMYK or Pantone color spaces, some
                        fidelity might be lost.
                    </Typography>
                </div>
            )}
        </Drawer>
    );
};
