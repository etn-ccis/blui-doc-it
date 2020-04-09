import React from 'react';
import { MaterialDesign } from '../../assets/icons';
import { OpenInNew } from '@material-ui/icons';
import {
    Card,
    Typography,
    CardProps,
    CardActionArea,
    makeStyles,
    createStyles,
    Theme,
    useTheme,
    CardActionAreaProps,
} from '@material-ui/core';

type MaterialDesignDescriptionProps = {
    // The icon used on the left
    avatar?: JSX.Element;

    // Secondary description text
    description?: string;

    // props applied to the card action area
    CardActionAreaProps?: CardActionAreaProps;

    // The icon used on the right
    icon?: JSX.Element;

    // Title text
    title?: string;

    // URL to be opened from a new window
    url: string;
} & CardProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: theme.spacing(38),
            marginBottom: theme.spacing(2),
            marginRight: theme.spacing(2),
            display: 'inline-block',
        },
        actionArea: {
            flexDirection: 'row',
            display: 'flex',
            padding: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            alignItems: 'flex-start',
        },
        textArea: {
            flex: 1,
            margin: `0 ${theme.spacing(2)}px`,
            minHeight: theme.spacing(12),
        },
    })
);

export const MaterialDesignDescription: React.FC<MaterialDesignDescriptionProps> = (props): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles();
    const {
        avatar = <MaterialDesign style={{ height: theme.spacing(6), width: theme.spacing(6) }} />,
        description = 'Read about how the pattern is defined in Material.io. Follow their instructions unless PX Blue has defined it otherwise.',
        icon = <OpenInNew style={{ color: theme.palette.text.hint }} />,
        title = "Material's Description",
        url,
        ...cardProps
    } = props;
    return (
        <Card className={classes.root} {...cardProps}>
            <CardActionArea
                className={classes.actionArea}
                onClick={(e): void => {
                    if (e) {
                        window.open(url);
                    }
                }}
                {...props.CardActionAreaProps}
            >
                {avatar}
                <div className={classes.textArea}>
                    <Typography variant={'body2'} style={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography variant={'caption'}>{description}</Typography>
                </div>
                {icon}
            </CardActionArea>
        </Card>
    );
};
