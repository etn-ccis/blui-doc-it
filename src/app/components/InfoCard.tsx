import React, { MouseEvent } from 'react';
import { Typography, useTheme } from '@material-ui/core';
import * as Colors from '@pxblue/colors';

const getTopPaddingForAspectRatio = (ratio: AspectRatio | undefined): string => {
    switch (ratio) {
        case '2x1':
            return '50%';
        case '3x2':
            return '66.67%';
        case '4x3':
            return '75%';
        case '16x9':
        default:
            return '56.25%';
    }
};
type AspectRatio = '16x9' | '4x3' | '3x2' | '2x1';
type InfoCardProps = {
    source: string;
    onClick?: (event: MouseEvent) => void;
    aspectRatio?: AspectRatio;
    title: string;
    description: string;
};

export const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const theme = useTheme();
    return (
        <div style={{ cursor: props.onClick ? 'pointer' : 'default' }} onClick={props.onClick}>
            <div
                style={{
                    paddingTop: getTopPaddingForAspectRatio(props.aspectRatio),
                    width: '100%',
                    backgroundImage: `url(${props.source})`,
                    backgroundSize: 'cover',
                    marginBottom: theme.spacing(2),
                }}
            />
            <Typography variant={'h6'}>{props.title}</Typography>
            <Typography variant={'body2'} style={{ color: Colors.gray[500], marginTop: theme.spacing(1) }}>
                {props.description}
            </Typography>
        </div>
    );
};
InfoCard.displayName = 'InfoCard';
InfoCard.defaultProps = {
    aspectRatio: '2x1',
};
