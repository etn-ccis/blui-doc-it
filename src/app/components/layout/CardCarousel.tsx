import React from 'react';
import Typography from '@mui/material/Typography';
import { Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as Colors from '@brightlayer-ui/colors';

const styles: Record<string, SxProps<Theme>> = {
    cardWrapper: {
        width: '100%',
        backgroundSize: 'cover',
    },
    cardBody: {
        height: '100%',
        width: '100%',
        p: 6,
        background: 'rgba(29, 37, 41, 0.8)',
        color: Colors.white[50],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        maxWidth: 300,
    },
};

type CarouselCardProps = {
    height?: number;
    backgroundImage?: string;
    title: string;
    description: string;
    icon?: JSX.Element;
    onClick?: () => void;
};

export const CarouselCard: React.FC<CarouselCardProps> = (props): JSX.Element => (
    <Box
        sx={{
            ...styles.cardWrapper,
            height: props.height,
            backgroundImage: `url(${props.backgroundImage ?? ''})`,
            cursor: props.onClick ? 'pointer' : 'default',
        }}
        onClick={(): void => {
            if (props.onClick !== undefined) {
                props.onClick();
            }
        }}
    >
        <Box
            sx={{
                ...styles.cardBody,
                '&:hover': {
                    background: props.onClick ? 'rgba(29, 37, 41, 0.6)' : 'rgba(29, 37, 41, 0.8)',
                },
            }}
        >
            <Box sx={styles.textWrapper}>
                <Box sx={{ textAlign: 'center', opacity: 0.8 }}>{props.icon}</Box>
                <Typography variant={'h6'} sx={{ display: 'flex', alignItems: 'center' }}>
                    {props.title}
                </Typography>
                <Typography variant={'body2'}>{props.description}</Typography>
            </Box>
        </Box>
    </Box>
);
CarouselCard.displayName = 'CarouselCard';
CarouselCard.defaultProps = {
    height: 450,
};
