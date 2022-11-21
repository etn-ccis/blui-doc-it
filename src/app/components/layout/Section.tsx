import React from 'react';
import { Typography, Divider, useTheme } from '@mui/material';
import { CSSProperties } from '@mui/styles';

type SectionProps = {
    title: string;
    align?: 'left' | 'center';
    maxWidth?: number;
    style?: CSSProperties;
    background?: 'light' | 'dark';
    children?: React.ReactNode;
};
export const Section: React.FC<SectionProps> = (props) => {
    const theme = useTheme();
    return (
        <div
            style={Object.assign(
                {
                    backgroundColor:
                        props.background === 'light'
                            ? theme.palette.background.paper
                            : theme.palette.background.default,
                    width: '100%',
                    padding: `${theme.spacing(6)}px 0`,
                },
                props.style
            )}
        >
            <div
                style={{
                    margin: '0 auto',
                    maxWidth: props.maxWidth,
                    padding: `0 ${theme.spacing(6)}px`,
                    textAlign: props.align,
                }}
            >
                <Typography
                    variant={'h5'}
                    align={props.align}
                    style={{ fontWeight: 600, marginBottom: theme.spacing(2) }}
                >
                    {props.title}
                </Typography>
                <Divider style={{ width: '100%', opacity: props.align === 'center' ? 0 : 1 }} />
                <Divider
                    style={{
                        width: theme.spacing(8),
                        height: 2,
                        backgroundColor: theme.palette.primary.main,
                        margin: props.align === 'center' ? '-1px auto 0' : '-1px 0 0 0',
                    }}
                />
                {props.children}
            </div>
        </div>
    );
};
Section.displayName = 'PageSection';
Section.defaultProps = {
    maxWidth: 1072,
    align: 'left',
    background: 'dark',
};
