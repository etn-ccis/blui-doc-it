import React, { ComponentProps } from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Bookmark } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';
import { AppState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import { PXBlueColor } from '@pxblue/types';

const getColorLabel = (color: string): JSX.Element | null => {
    const format = useSelector((state: AppState) => state.app.colorFormat);
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
            maxWidth: theme.spacing(9),
            minWidth: theme.spacing(9),
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
    })
);

export const ColorSwatch: React.FC<SwatchProps> = (props): JSX.Element => {
    const classes = useStyles();
    const { color, weight, ...otherProps } = props;

    return (
        <div {...otherProps}>
            <div className={classes.swatch} style={{ background: color }}>
                {props.weight === '500' && <Bookmark className={classes.bookmark} />}
            </div>
            <div className={classes.label}>
                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>{`${weight}:`}</Typography>
                <Typography variant={'caption'} style={{ fontFamily: 'Roboto Mono' }}>
                    {getColorLabel(color)}
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
