import React, { ComponentProps, useCallback, useEffect, useState } from 'react';
import { Typography, Theme, useTheme, SxProps, Box } from '@mui/material';
import { Check } from '@mui/icons-material';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import { AppState } from '../../redux/reducers';
import { copyTextToClipboard } from '../../shared';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BLUIColor } from '@brightlayer-ui/types';
import colorModule from 'color';
import { CHANGE_SELECTED_COLOR } from '../../redux/actions';
import { ListItemTag } from '@brightlayer-ui/react-components';

const getColorLabel = (color: string, format: 'rgb' | 'hex'): JSX.Element | null => {
    if (format === 'hex') {
        return <span>{color}</span>;
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? (
        <div style={{ lineHeight: 1 }}>
            <div>R: {parseInt(result[1], 16)}</div>
            <div>G: {parseInt(result[2], 16)}</div>
            <div>B: {parseInt(result[3], 16)}</div>
        </div>
    ) : null;
};

type PaletteProps = {
    name: string;
    category: 'ui' | 'branding';
};

type SwatchProps = ComponentProps<'div'> &
    PaletteProps & {
        color: string;
        weight: number;
    };

const styles: { [key: string]: SxProps<Theme> } = {
    swatchWrapper: (theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        mb: 1,
        maxWidth: theme.spacing(8.5),
        minWidth: theme.spacing(8.5),
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(0.5),
        },
        '&:hover': {
            boxShadow: theme.shadows[4],
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary : undefined,
            transition: theme.transitions.create('box-shadow', { duration: theme.transitions.duration.shortest }),
            cursor: 'pointer',
        },
        // TODO: fix this style conversion
        '&$isSelected': {
            border: `2px solid ${theme.palette.primary.main}`,
        },
    }),
    swatch: {
        height: 60,
        color: Colors.white[50],
        background: 'background.paper',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        p: 1,
        position: 'relative',
        '&:hover $copyOnHoverButton': {
            display: 'flex',
        },
        '&$isSelected': {
            color: 'primary.main',
        },
    },
    paletteWrapper: (theme) => ({
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
            WebkitJustifyContent: 'space-between',
        },
    }),
    copyOnHoverButton: (theme) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        background: colorModule(theme.palette.background.paper).alpha(0.9).string(),
    }),
    isSelected: {},
    tags: (theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        boxSizing: 'content-box',
    }),
};

export const ColorSwatch: React.FC<SwatchProps> = (props): JSX.Element => {
    const theme = useTheme();
    const { color, name, category, weight, ...otherProps } = props;
    const format = useSelector((state: AppState) => state.app.colorFormat);
    const showColorContrast = useSelector((state: AppState) => state.app.showColorContrast);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const selectedColor = useSelector((state: AppState) => state.app.selectedColor);
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
        navigate(`${location.pathname}?category=${category}&name=${name}&weight=${weight}`, { replace: true });
        dispatch({ type: CHANGE_SELECTED_COLOR, payload: { category, name, weight } });
    }, []);

    const getColorContrastTag = useCallback(
        (contrastRatio: number) => {
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
        },
        [theme]
    );

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
    }, [selectedColor]);

    return (
        <Box
            {...otherProps}
            // @ts-ignore TODO: Fix this style combination
            sx={{
                ...styles.swatchWrapper,
                ...(isSelected ? styles.selected : {}),
            }}
            id={`color-${category}-${name}-${weight}`}
        >
            <Box
                sx={styles.swatch}
                style={{ background: color, color: colorModule(color).isLight() ? '#000d' : 'white' }}
                onClick={onSelectColor}
            >
                {selectedColor !== undefined &&
                    selectedColorHex !== '' &&
                    showColorContrast &&
                    !isSelected &&
                    getColorContrastTag(
                        Math.round(colorModule(color).contrast(colorModule(selectedColorHex)) * 100) / 100
                    )}
            </Box>
            <Box
                // @ts-ignore TODO: Fix this style combination
                sx={{
                    ...styles.label,
                    ...(isSelected ? styles.selected : {}),
                }}
            >
                <Box
                    sx={styles.copyOnHoverButton}
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
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            Copied
                            <Check fontSize={'inherit'} />
                        </Typography>
                    )}
                </Box>
                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>{`${weight}:`}</Typography>
                <Typography variant={'caption'} style={{ fontFamily: 'Roboto Mono' }}>
                    {colorLabel()}
                </Typography>
            </Box>
        </Box>
    );
};

export const ColorPalette: React.FC<PaletteProps> = (props): JSX.Element => {
    const palette =
        // @ts-ignore TODO: sort out these types
        props.category === 'ui' ? (Colors[props.name] as BLUIColor) : (BrandingColors[props.name] as BLUIColor);
    return (
        <Box sx={styles.paletteWrapper}>
            {(Object.keys(palette) as Array<keyof BLUIColor>)
                .filter((key) => parseInt(key as string, 10))
                .map((key) => (
                    <ColorSwatch
                        key={key}
                        color={palette[key] || ''}
                        weight={key as number}
                        name={props.name}
                        category={props.category}
                    />
                ))}
        </Box>
    );
};
