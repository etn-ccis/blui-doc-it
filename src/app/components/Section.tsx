import React from 'react';
import { Typography, Divider, useTheme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import * as Colors from '@pxblue/colors';

type SectionProps = {
    title: string;
    align?: 'left' | 'center';
    maxWidth?: number;
    style?: CSSProperties;
    background?: 'light' | 'dark';
};
export const Section: React.FC<SectionProps> = (props) => {
    const theme = useTheme();
    return (
        <div style={Object.assign({ backgroundColor: props.background === 'light' ? Colors.white[50] : Colors.white[200], width: '100%', padding: `${theme.spacing(4)}px 0` }, props.style)}>
            <div style={{ margin: '0 auto', maxWidth: props.maxWidth, padding: `0 ${theme.spacing(6)}px`, textAlign: props.align }}>
                <Typography variant={'h5'} align={props.align} style={{ fontWeight: 600, marginBottom: theme.spacing(2) }}>
                    {props.title}
                </Typography>
                <Divider style={{ width: '100%', opacity: props.align === 'center' ? 0 : 1 }} />
                <Divider
                    style={{
                        width: theme.spacing(8),
                        height: 2,
                        backgroundColor: Colors.blue[500],
                        margin: props.align === 'center' ? '-1px auto 0' : '-1px 0 0 0',
                    }}
                />
                {props.children}
            </div>
        </div>
    )
}
Section.displayName = 'PageSection';
Section.defaultProps = {
    maxWidth: 1072,
    align: 'left',
    background: 'dark',
};
