import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import { Check } from '@mui/icons-material';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import { useAppSelector, useAppDispatch, changeSelectedColor, RootState } from '../../redux';
import { copyTextToClipboard } from '../../shared';
import { useNavigate, useLocation } from 'react-router';
import { BLUIColor } from '@brightlayer-ui/types';
import colorModule from 'color';
import { ListItemTag } from '@brightlayer-ui/react-components';
import { SystemStyleObject } from '@mui/system';

const getColorLabel = (color: string, format: 'rgb' | 'hex'): React.JSX.Element | null => {
    if (format === 'hex') {
        return <Typography variant={'caption'}>{color}</Typography>;
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? (
        <Stack style={{ lineHeight: 1 }}>
            <Typography fontFamily={'inherit'} component={'span'} variant={'caption'} sx={{ lineHeight: 1 }}>
                R: {parseInt(result[1], 16)}
            </Typography>
            <Typography fontFamily={'inherit'} component={'span'} variant={'caption'} sx={{ lineHeight: 1 }}>
                G: {parseInt(result[2], 16)}
            </Typography>
            <Typography fontFamily={'inherit'} component={'span'} variant={'caption'} sx={{ lineHeight: 1 }}>
                B: {parseInt(result[3], 16)}
            </Typography>
        </Stack>
    ) : null;
};

type PaletteProps = {
    name: string;
    category: 'ui' | 'branding';
};

type SwatchProps = BoxProps &
    PaletteProps & {
        color: string;
        weight: number;
    };

const styles: Record<string, SystemStyleObject<Theme>> = {
    tags: {
        boxSizing: 'content-box',
        border: `1px solid`,
        borderColor: 'divider',
    },
};

export const ColorSwatch: React.FC<SwatchProps> = (props): React.JSX.Element => {
    const { color, name, category, weight, ...otherProps } = props;
    const format = useAppSelector((state: RootState) => state.app.colorFormat);
    const showColorContrast = useAppSelector((state: RootState) => state.app.showColorContrast);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [copied, setCopied] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const selectedColor = useAppSelector((state: RootState) => state.app.selectedColor);
    const [selectedColorHex, setSelectedColorHex] = useState('');
    const colorLabel = useCallback(() => getColorLabel(color, format), [color, format]);

    const copyColorToClipboard = useCallback(() => {
        if (format === 'hex') {
            copyTextToClipboard(color);
        } else {
            copyTextToClipboard(colorModule(color).rgb().string());
        }
        setCopied(true);
    }, [color, format]);

    const onSelectColor = useCallback(() => {
        void navigate(`${location.pathname}?category=${category}&name=${name}&weight=${weight}`, {
            replace: true,
            state: { fromColorSwatch: true },
        });
        dispatch(changeSelectedColor({ category, name, weight }));
    }, []);

    const getColorContrastTag = useCallback((contrastRatio: number) => {
        if (contrastRatio <= 3) {
            return (
                <ListItemTag
                    label={`${contrastRatio}:1`}
                    backgroundColor={Colors.red[500]}
                    title={
                        'WCAG requires a minimum 3:1 contrast ratio for icons and headline text to pass the AA level accessibility standard.'
                    }
                    sx={styles.tags}
                />
            );
        } else if (contrastRatio <= 4.5) {
            return (
                <ListItemTag
                    label={`${contrastRatio}:1`}
                    backgroundColor={Colors.yellow[500]}
                    title={
                        'WCAG requires a minimum 4.5:1 contrast ratio for body text to pass the AA level accessibility standard.'
                    }
                    sx={styles.tags}
                />
            );
        }
        return <Typography variant={'overline'}>{contrastRatio}:1</Typography>;
    }, []);

    useEffect(() => {
        if (
            selectedColor &&
            selectedColor.category === category &&
            selectedColor.name === name &&
            selectedColor.weight === weight
        ) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
        if (selectedColor) {
            if (selectedColor.category === 'ui') {
                // @ts-ignore
                setSelectedColorHex(Colors[selectedColor.name][selectedColor.weight]);
            } else {
                // @ts-ignore
                setSelectedColorHex(BrandingColors[selectedColor.name][selectedColor.weight]);
            }
        }
    }, [selectedColor, category, name, weight]);

    return (
        <Box
            {...otherProps}
            sx={[
                (theme): SystemStyleObject => ({
                    border: `1px solid`,
                    borderColor: 'divider',
                    mb: 1,
                    maxWidth: 68,
                    minWidth: 68,
                    mr: { xs: 0.5, md: 'unset' },
                    '&:hover': {
                        boxShadow: 4,
                        borderColor: theme.palette.mode === 'dark' ? 'text.primary' : undefined,
                        transition: theme.transitions.create('box-shadow', {
                            duration: theme.transitions.duration.shortest,
                        }),
                        cursor: 'pointer',
                    },
                }),
                isSelected ? { border: '2px solid', borderColor: 'primary.main' } : {},
            ]}
            id={`color-${category}-${name}-${weight}`}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                    height: 60,
                    position: 'relative',
                    background: color ?? 'background.paper',
                    color: colorModule(color).isLight() ? '#000d' : 'white',
                }}
                onClick={onSelectColor}
            >
                {selectedColor !== undefined &&
                    selectedColorHex !== '' &&
                    showColorContrast &&
                    !isSelected &&
                    getColorContrastTag(
                        Math.round(colorModule(color).contrast(colorModule(selectedColorHex)) * 100) / 100
                    )}
            </Stack>
            <Box
                sx={[
                    {
                        p: 1,
                        position: 'relative',
                        '&:hover > .MuiBox-root': {
                            display: 'flex',
                        },
                    },
                    isSelected ? { color: 'primary.main' } : {},
                ]}
            >
                <Box
                    sx={(theme): SystemStyleObject => ({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: colorModule(theme.palette.background.paper).alpha(0.9).string(),
                    })}
                    onClick={copyColorToClipboard}
                    onMouseLeave={(): void => {
                        setCopied(false);
                    }}
                >
                    {!copied ? (
                        <Typography variant={'caption'} color={'primary'}>
                            {format === 'hex' ? 'Copy HEX' : 'Copy RGB'}
                        </Typography>
                    ) : (
                        <Typography
                            variant={'caption'}
                            color={'textPrimary'}
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            Copied
                            <Check fontSize={'inherit'} />
                        </Typography>
                    )}
                </Box>
                <Typography variant={'subtitle2'} sx={{ fontWeight: 600 }}>{`${weight}:`}</Typography>
                <Typography variant={'caption'} sx={{ fontFamily: 'Roboto Mono' }}>
                    {colorLabel()}
                </Typography>
            </Box>
        </Box>
    );
};

export const ColorPalette: React.FC<PaletteProps> = (props): React.JSX.Element => {
    const palette =
        // @ts-ignore TODO: sort out these types
        props.category === 'ui' ? (Colors[props.name] as BLUIColor) : (BrandingColors[props.name] as BLUIColor);
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            {(Object.keys(palette) as Array<keyof BLUIColor>)
                .filter((key) => parseInt(key as string, 10))
                .map((key) => (
                    <ColorSwatch
                        key={key}
                        color={palette[key] ?? ''}
                        weight={parseInt(key as string)}
                        name={props.name}
                        category={props.category}
                    />
                ))}
        </Box>
    );
};
