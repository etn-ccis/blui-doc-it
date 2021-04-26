import React, { ComponentProps, useCallback, useState } from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Bookmark, Check } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';
import { AppState } from '../../redux/reducers';
import { copyTextToClipboard } from '../../shared';
import { useSelector } from 'react-redux';
import { PXBlueColor } from '@pxblue/types';
import colorModule from 'color';

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

type SwatchProps = ComponentProps<'div'> & {
    color: string;
    weight: string;
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
            background: theme.palette.background.paper,
            padding: theme.spacing(1),
            position: 'relative',
            '&:hover $copyOnHoverButton': {
                display: 'flex',
                cursor: 'pointer',
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
    })
);

export const ColorSwatch: React.FC<SwatchProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { color, weight, ...otherProps } = props;
    const format = useSelector((state: AppState) => state.app.colorFormat);

    const [copied, setCopied] = useState(false);

    const colorLabel = useCallback(() => getColorLabel(color, format), [color, format]);

    const copyColorToClipboard = useCallback(() => {
        if (format === 'hex') {
            copyTextToClipboard(color);
        } else {
            copyTextToClipboard(colorModule(color).rgb().string());
        }
        setCopied(true);
    }, [color, format]);

    return (
        <div {...otherProps}>
            <div className={classes.swatch} style={{ background: color }}>
                {props.weight === '500' && <Bookmark className={classes.bookmark} />}
            </div>
            <div className={classes.label}>
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

type PaletteProps = {
    palette: PXBlueColor;
};
export const ColorPalette: React.FC<PaletteProps> = (props): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.paletteWrapper}>
            {(Object.keys(props.palette) as Array<keyof PXBlueColor>)
                .filter((key) => parseInt(key as string, 10))
                .map((key) => (
                    <ColorSwatch
                        key={key}
                        className={classes.swatchWrapper}
                        color={props.palette[key] || ''}
                        weight={key as string}
                    />
                ))}
        </div>
    );
};
