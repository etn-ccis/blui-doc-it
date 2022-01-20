import React, { ComponentProps, useCallback, useEffect, useState } from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Bookmark, Check } from '@material-ui/icons';
import * as Colors from '@brightlayer-ui/colors';
import * as BrandingColors from '@brightlayer-ui/colors-branding';
import { AppState } from '../../redux/reducers';
import { copyTextToClipboard } from '../../shared';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BLUIColor } from '@brightlayer-ui/types';
import colorModule from 'color';
import { CHANGE_SELECTED_COLOR } from '../../redux/actions';
import clsx from 'clsx';

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        swatchWrapper: {
            border: `1px solid ${theme.palette.divider}`,
            marginBottom: theme.spacing(1),
            maxWidth: theme.spacing(8.5),
            minWidth: theme.spacing(8.5),
            [theme.breakpoints.down('sm')]: {
                marginRight: theme.spacing(0.5),
            },
            '&:hover': {
                boxShadow: theme.shadows[4],
                transition: theme.transitions.create('box-shadow', { duration: theme.transitions.duration.shortest }),
            },
            '&$isSelected': {
                border: `2px solid ${theme.palette.primary.main}`,
            },
        },
        swatch: {
            paddingTop: '100%',
            color: Colors.white[50],
            background: theme.palette.background.paper,
            position: 'relative',
        },
        bookmark: {
            top: theme.spacing(1),
            left: theme.spacing(1),
            position: 'absolute',
        },
        label: {
            padding: theme.spacing(1),
            position: 'relative',
            '&:hover $copyOnHoverButton': {
                display: 'flex',
                cursor: 'pointer',
            },
            '&$isSelected': {
                backgroundColor: colorModule(theme.palette.primary.main).fade(0.8).toString(),
                color: theme.palette.primary.main,
            },
        },
        paletteWrapper: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            [theme.breakpoints.up('md')]: {
                justifyContent: 'space-between',
                WebkitJustifyContent: 'space-between',
            },
        },
        copyOnHoverButton: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            background: colorModule(theme.palette.background.paper).alpha(0.9).string(),
        },
        isSelected: {},
    })
);

export const ColorSwatch: React.FC<SwatchProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { color, name, category, weight, ...otherProps } = props;
    const format = useSelector((state: AppState) => state.app.colorFormat);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const selectedColor = useSelector((state: AppState) => state.app.selectedColor);
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
        history.replace(`${location.pathname}?category=${category}&name=${name}&weight=${weight}`);
        dispatch({ type: CHANGE_SELECTED_COLOR, payload: { category, name, weight } });
    }, []);

    useEffect(() => {
        if (selectedColor === undefined) {
            setIsSelected(false);
        } else {
            setIsSelected(
                selectedColor.category === category && selectedColor.name === name && selectedColor.weight === weight
            );
        }
    }, [selectedColor]);

    return (
        <div {...otherProps} className={clsx(classes.swatchWrapper, { [classes.isSelected]: isSelected })}>
            <div className={classes.swatch} style={{ background: color }} onClick={onSelectColor}>
                {weight === 500 && <Bookmark className={classes.bookmark} />}
            </div>
            <div className={clsx(classes.label, { [classes.isSelected]: isSelected })}>
                <div
                    className={classes.copyOnHoverButton}
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
                </div>
                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>{`${weight}:`}</Typography>
                <Typography variant={'caption'} style={{ fontFamily: 'Roboto Mono' }}>
                    {colorLabel()}
                </Typography>
            </div>
        </div>
    );
};

export const ColorPalette: React.FC<PaletteProps> = (props): JSX.Element => {
    const classes = useStyles();
    const palette =
        // @ts-ignore
        props.category === 'ui' ? (Colors[props.name] as BLUIColor) : (BrandingColors[props.name] as BLUIColor);
    return (
        <div className={classes.paletteWrapper}>
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
        </div>
    );
};
