import React from 'react';
import { MaterialDesign } from '../../assets/icons';
import { CTA_BUTTON } from '../../shared';
import { OpenInNew } from '@mui/icons-material';
import Card, { CardProps } from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea, { CardActionAreaProps } from '@mui/material/CardActionArea';
import { Theme, useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';

type MaterialDesignDescriptionProps = {
    // The icon used on the left
    avatar?: React.JSX.Element;

    // Secondary description text
    description?: string;

    // props applied to the card action area
    CardActionAreaProps?: CardActionAreaProps;

    // The icon used on the right
    icon?: React.JSX.Element;

    // Title text
    title?: string;

    // URL to be opened from a new window
    url: string;

    // minimum card height
    minCardHeight?: 'unset' | number;
} & CardProps;

const styles: Record<string, SxProps<Theme>> = {
    root: {
        width: CTA_BUTTON.WIDTH,
        maxWidth: '100%',
        mb: 2,
        mr: { xs: 0, sm: 2 },
        display: 'inline-block',
    },
    contentArea: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'flex-start',
        p: 1,
        pb: 1.5,
    },
    textArea: {
        flex: 1,
        my: 0,
        mx: 2,
    },
    title: {
        fontWeight: 600,
    },
};

export const MaterialDesignDescription: React.FC<MaterialDesignDescriptionProps> = (props): React.JSX.Element => {
    const theme = useTheme();
    const {
        avatar = <MaterialDesign sx={{ height: 48, width: 48 }} />,
        description = `Learn about Material Design's description of this pattern. Follow their guidance unless Brightlayer UI recommends specific changes.`,
        icon = <OpenInNew style={{ color: theme.palette.text.secondary }} />,
        title = `Material's Description`,
        url,
        minCardHeight,
        ...cardProps
    } = props;
    return (
        <Card sx={styles.root} variant={theme.palette.mode === 'light' ? 'elevation' : 'outlined'} {...cardProps}>
            <CardActionArea
                onClick={(e): void => {
                    if (e) {
                        window.open(url, '_blank');
                    }
                }}
                {...props.CardActionAreaProps}
            >
                <Box sx={styles.contentArea} style={{ minHeight: minCardHeight ?? CTA_BUTTON.HEIGHT }}>
                    {avatar}
                    <Box sx={styles.textArea}>
                        <Typography variant={'body2'} sx={styles.title}>
                            {title}
                        </Typography>
                        <Typography variant={'caption'}>{description}</Typography>
                    </Box>
                    {icon}
                </Box>
            </CardActionArea>
        </Card>
    );
};
