import React from 'react';
import { MaterialDesign } from '../../assets/icons';
import { CTA_BUTTON } from '../../shared';
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
            width: CTA_BUTTON.WIDTH,
            maxWidth: '100%',
            marginBottom: theme.spacing(2),
            marginRight: theme.spacing(2),
            display: 'inline-block',
            [theme.breakpoints.down('xs')]: {
                marginRight: 0,
            },
        },
        contentArea: {
            flexDirection: 'row',
            display: 'flex',
            minHeight: CTA_BUTTON.HEIGHT,
            alignItems: 'flex-start',
            padding: theme.spacing(1),
            paddingBottom: theme.spacing(1.5),
        },
        textArea: {
            flex: 1,
            margin: `0 ${theme.spacing(2)}px`,
        },
        title: {
            fontWeight: 600,
        },
    })
);

export const MaterialDesignDescription: React.FC<MaterialDesignDescriptionProps> = (props): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles();
    const {
        avatar = <MaterialDesign style={{ height: theme.spacing(6), width: theme.spacing(6) }} />,
        description = `Learn about Material Design's description of this pattern. Follow their guidance unless PX Blue recommends specific changes.`,
        icon = <OpenInNew style={{ color: theme.palette.text.hint }} />,
        title = `Material's Description`,
        url,
        ...cardProps
    } = props;
    return (
        <Card className={classes.root} {...cardProps}>
            <CardActionArea
                onClick={(e): void => {
                    if (e) {
                        window.open(url, '_blank');
                    }
                }}
                {...props.CardActionAreaProps}
            >
                <div className={classes.contentArea}>
                    {avatar}
                    <div className={classes.textArea}>
                        <Typography variant={'body2'} className={classes.title}>
                            {title}
                        </Typography>
                        <Typography variant={'caption'}>{description}</Typography>
                    </div>
                    {icon}
                </div>
            </CardActionArea>
        </Card>
    );
};
