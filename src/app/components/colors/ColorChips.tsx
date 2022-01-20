import React, { useCallback } from 'react';
// @ts-ignore
import Pantone from 'nearest-pantone';
import { FileCopy } from '@material-ui/icons';
import { Typography, Chip, Theme, makeStyles, useTheme } from '@material-ui/core';
import color from 'color';

type Pantone = {
    pantone: string;
    name: string;
    hex: string;
};
type ColorType = 'HEX' | 'RGB' | 'CMYK' | 'HSL' | 'PANTONE';
type ColorChipsProps = {
    hex: string;
    type: ColorType;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: { marginRight: theme.spacing(), marginBottom: theme.spacing() },
    content: { display: 'flex', alignItems: 'center' },
    divider: { color: theme.palette.divider, margin: `0 ${theme.spacing(0.5)}px` },
    copyIcon: { fontSize: 16, marginLeft: theme.spacing() },
}));

const getColorCode = (type: ColorType, hex: string): string => {
    const hslColor = color(hex).hsl().object();
    const cmykColor = color(hex).cmyk().object();
    const pantoneColor = Pantone.getClosestColor(hex) as Pantone;

    switch (type) {
        case 'HEX':
            return hex;
        case 'RGB':
            return color(hex).rgb().string();
        case 'HSL':
            return `hsl(${Math.round(hslColor.h)}, ${Math.round(hslColor.s)}%, ${Math.round(hslColor.l)})`;
        case 'CMYK':
            return `C: ${Math.round(cmykColor.c)}, M: ${Math.round(cmykColor.m)}, Y: ${Math.round(
                cmykColor.y
            )}, K: ${Math.round(cmykColor.k)}`;
        case 'PANTONE':
            return pantoneColor.pantone;
        default:
            return '--';
    }
};

export const ColorChips: React.FC<ColorChipsProps> = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const getChipContent = useCallback(
        (type: ColorType, code: string): React.ReactNode => {
            const starredType = ['HSL', 'CMYK', 'PANTONE'].includes(type);
            return (
                <span className={classes.content}>
                    <Typography variant={'overline'} color={'textSecondary'}>
                        {type}
                        {starredType && '*'}
                    </Typography>
                    <span className={classes.divider}>|</span>
                    <Typography variant={'caption'} color={'textPrimary'}>
                        {code}
                    </Typography>
                    <FileCopy className={classes.copyIcon} htmlColor={theme.palette.text.secondary} />
                </span>
            );
        },
        [theme]
    );
    return (
        <Chip
            clickable
            className={classes.root}
            label={getChipContent(props.type, getColorCode(props.type, props.hex))}
        />
    );
};
