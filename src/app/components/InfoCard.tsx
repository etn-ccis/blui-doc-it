import React, { MouseEvent } from 'react';
import { Typography, useTheme, makeStyles, Theme, createStyles } from '@material-ui/core';

const getTopPaddingForAspectRatio = (ratio: AspectRatio | undefined): string => {
    switch (ratio) {
        case '1x1':
            return '100%';
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
type AspectRatio = '16x9' | '4x3' | '3x2' | '2x1' | '1x1';
type InfoCardProps = {
    source: string;
    onClick?: (event: MouseEvent) => void;
    aspectRatio?: AspectRatio;
    title: string;
    description: string;
    spacing: number;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: {
            width: '100%',
            backgroundSize: 'cover',
            marginBottom: theme.spacing(2),
            border: `1px solid ${theme.palette.grey[100]}`,
        },
        card: {
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
);

export const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <div
            style={{
                cursor: props.onClick ? 'pointer' : 'default',
                margin: theme.spacing((-1 * props.spacing) / 2),
                padding: theme.spacing(props.spacing / 2),
            }}
            onClick={props.onClick}
            className={props.onClick ? classes.card : ''}
        >
            <div
                style={{
                    backgroundImage: `url(${props.source})`,
                    paddingTop: getTopPaddingForAspectRatio(props.aspectRatio),
                }}
                className={classes.image}
            />
            <Typography variant={'h6'}>{props.title}</Typography>
            <Typography variant={'body2'} style={{ color: theme.palette.text.secondary, marginTop: theme.spacing(1) }}>
                {props.description}
            </Typography>
        </div>
    );
};
InfoCard.displayName = 'InfoCard';
InfoCard.defaultProps = {
    aspectRatio: '2x1',
};
