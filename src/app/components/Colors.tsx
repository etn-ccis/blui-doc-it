import React, { ComponentProps } from 'react';
import { Typography } from '@material-ui/core';
import { Bookmark } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';
import { AppState } from '../redux/reducers';
import { useSelector } from 'react-redux';


const getColorLabel = (color: string): JSX.Element | null => {
    const format = useSelector((state: AppState) => state.app.colorFormat);
    if (format === 'hex') {
        return <span>{color}</span>;
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? (
        <div style={{lineHeight: 1}}>
            <div>R: {parseInt(result[1], 16)}</div>
            <div>G: {parseInt(result[2], 16)}</div>
            <div>B: {parseInt(result[3], 16)}</div>
        </div>
    ) : null;
}

type PXBlueColor = {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100?: string;
    A200?: string;
    A400?: string;
    A700?: string;
    contrastDefaultColor?: string;
};
type SwatchProps = ComponentProps<'div'> & {
    color: string;
    weight: string;
}
export const ColorSwatch: React.FC<SwatchProps> = (props): JSX.Element => (
    <div style={Object.assign({ border: `1px solid ${Colors.black[100]}` }, props.style)}>
        <div style={{ paddingTop: '100%', color: 'white', background: props.color, position: 'relative' }}>
            {props.weight === '500' && <Bookmark style={{ top: 8, left: 8, position: 'absolute' }} />}
        </div>
        <div style={{ background: 'white', padding: 16, color: Colors.black[500] }}>
            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>{`${props.weight}:`}</Typography>
            <Typography variant={'caption'} style={{ fontFamily: 'Roboto Mono' }}>{getColorLabel(props.color)}</Typography>
        </div>
    </div>
)

type PaletteProps = {
    palette: PXBlueColor;
}
export const ColorPalette: React.FC<PaletteProps> = (props): JSX.Element => (
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        {(Object.keys(props.palette) as Array<keyof PXBlueColor>).filter((key) => parseInt(key as string, 10)).map((key) => (
            <ColorSwatch key={key} style={{ marginRight: 8, marginBottom: 8, flex: '1 1 0px', maxWidth: 85, minWidth: 85 }} color={props.palette[key] || ''} weight={key as string} />
        ))}
    </div>
);

