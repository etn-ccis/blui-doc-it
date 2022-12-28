import React, { useCallback, useEffect, useState } from 'react';
import { Check, FileCopy } from '@mui/icons-material';
import { Typography, Chip, useTheme, Box, Theme } from '@mui/material';
import color from 'color';
import { copyTextToClipboard } from '../../shared';
import { SystemStyleObject } from '@mui/system';

type ColorType = 'HEX' | 'RGB' | 'CMYK' | 'HSL';
type ColorChipsProps = {
    hex: string;
    type: ColorType;
};

const COLOR_NOT_AVAILABLE = '--';

const styles: { [key: string]: SystemStyleObject<Theme> } = {
    root: {
        mr: 1,
        mb: 1,
        position: 'relative',
    },
    content: { display: 'flex', alignItems: 'center' },
    divider: { color: 'divider', my: 0, mx: 0.5 },
    copyIcon: { fontSize: 16, ml: 1 },
    copiedOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: 200,
        visibility: 'visible',
        opacity: 1,
    },
};

const getColorCode = (type: ColorType, hex: string): string => {
    const hslColor = color(hex).hsl().object();
    const cmykColor = color(hex).cmyk().object();

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
        default:
            return COLOR_NOT_AVAILABLE;
    }
};

export const ColorChips: React.FC<ColorChipsProps> = (props) => {
    const theme = useTheme();

    const [textCopied, setTextCopied] = useState(false);
    const colorCode = getColorCode(props.type, props.hex);

    const getChipContent = useCallback(
        (type: ColorType, code: string): React.ReactNode => {
            const starredType = ['HSL', 'CMYK'].includes(type);
            return (
                <Box sx={styles.content}>
                    <Box
                        sx={[
                            styles.copiedOverlay,
                            (_theme): SystemStyleObject<Theme> =>
                                !textCopied
                                    ? {
                                          visibility: 'hidden',
                                          transition: _theme.transitions.create(['visibility', 'opacity'], {
                                              duration: _theme.transitions.duration.shorter,
                                          }),
                                          opacity: 0,
                                      }
                                    : {},
                        ]}
                    >
                        Copied
                        <Check fontSize="inherit" />
                    </Box>
                    <Typography variant={'overline'} color={'textSecondary'}>
                        {type}
                        {starredType && '*'}
                    </Typography>
                    <Box component={'span'} sx={styles.divider}>
                        |
                    </Box>
                    <Typography variant={'caption'} color={'textPrimary'} style={{ fontFamily: 'Roboto Mono' }}>
                        {code}
                    </Typography>
                    {code !== COLOR_NOT_AVAILABLE && (
                        <FileCopy sx={styles.copyIcon} htmlColor={theme.palette.text.secondary} />
                    )}
                </Box>
            );
        },
        [textCopied]
    );

    useEffect(() => {
        let copyTextTimer: NodeJS.Timeout;
        if (textCopied) {
            copyTextTimer = setTimeout((): void => {
                setTextCopied(false);
            }, 3000);
        }
        return (): void => {
            clearTimeout(copyTextTimer);
        };
    }, [textCopied]);

    return (
        <Chip
            clickable
            disabled={colorCode === COLOR_NOT_AVAILABLE}
            variant={colorCode === COLOR_NOT_AVAILABLE ? 'outlined' : 'filled'}
            onClick={(): void => {
                copyTextToClipboard(colorCode, () => {
                    setTextCopied(true);
                });
            }}
            sx={styles.root}
            label={getChipContent(props.type, colorCode)}
        />
    );
};
