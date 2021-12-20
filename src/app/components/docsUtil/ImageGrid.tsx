import React, { useState, HTMLAttributes } from 'react';
import { ListItemTag } from '@brightlayer-ui/react-components';
import {
    Grid,
    GridProps,
    makeStyles,
    createStyles,
    Typography,
    Theme,
    useTheme,
    useMediaQuery,
    PaletteType,
} from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { orange } from '@brightlayer-ui/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(5),
        },
        image: {
            border: `1px solid ${theme.palette.divider}`,
            maxHeight: '100%',
            maxWidth: '100%',
            [theme.breakpoints.up('sm')]: {
                cursor: 'zoom-in',
            },
        },
        fullScreenZoom: {
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: theme.palette.type === 'light' ? '#fffd' : '#000a',
            display: 'flex',
            zIndex: theme.zIndex.modal,
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.up('sm')]: {
                cursor: 'zoom-out',
            },
            padding: theme.spacing(2),
        },
    })
);

type Content = string | JSX.Element;
type ImageGridProps = HTMLAttributes<HTMLDivElement> & {
    caption?: string | string[];
    gridContainerProps?: GridProps;
    gridComponentProps?: GridProps;
    gridImageProps?: GridProps;
    images: Content[];
    regularWidth?: boolean;
    captionsUnderImages?: string[];
};

const getColoredCaption = (
    captionText: string,
    tag: string,
    palette: PaletteColor,
    themeType: PaletteType,
    title: string
): React.ReactNode => (
    <>
        <div
            style={{
                backgroundColor: palette[themeType],
                width: '100%',
                height: 12,
                marginBottom: 8,
            }}
        ></div>
        <ListItemTag label={tag} backgroundColor={palette.main} fontColor={palette.contrastText} title={title} />
        <br />
        {captionText.trim()}
    </>
);

export const ImageGrid: React.FC<ImageGridProps> = (props): JSX.Element => {
    const {
        images,
        caption,
        captionsUnderImages,
        regularWidth: fullSize,
        gridContainerProps,
        gridImageProps,
        gridComponentProps,
        ...rootProps
    } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [imageOpened, setImageOpened] = useState(-1);
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const captionArray = Array.isArray(caption) ? caption : [caption];

    const getTaggedCaption = React.useCallback((captionText?: string): React.ReactNode => {
        if (!captionText) return undefined;
        if (captionText.startsWith('DONT:')) {
            return getColoredCaption(
                captionText.slice(5),
                `DON'T`,
                theme.palette.error,
                theme.palette.type,
                'Under no circumstance should this ever be used.'
            );
        }
        if (captionText.startsWith('AVOID:')) {
            return getColoredCaption(
                captionText.slice(6),
                `AVOID`,
                { light: orange[100], main: orange[500], dark: orange[900], contrastText: 'black' },
                theme.palette.type,
                'Strong justifications are needed to carry design this way.'
            );
        }
        if (captionText.startsWith('CAUTION:')) {
            return getColoredCaption(
                captionText.slice(8),
                `CAUTION`,
                theme.palette.warning,
                theme.palette.type,
                'Must explore other design possibilities before choosing this path.'
            );
        }
        if (captionText.startsWith('DO:')) {
            return getColoredCaption(
                captionText.slice(3),
                `DO`,
                theme.palette.success,
                theme.palette.type,
                'We encourage you to design this way, and this is common in other applications using this design system too.'
            );
        }
        return captionText;
    }, []);

    return (
        <div className={classes.root} {...rootProps}>
            <Grid
                container
                spacing={2}
                alignItems={'flex-start'}
                justifyContent={images.length < 3 ? 'center' : undefined}
                wrap={'wrap'}
                style={{ marginBottom: theme.spacing(0.5) }}
                {...gridContainerProps}
            >
                {images.map((item, index) =>
                    typeof item === 'string' ? (
                        <Grid key={`content_${index}`} item xs={12} sm={fullSize ? 12 : 6} {...gridImageProps}>
                            <img
                                className={classes.image}
                                src={item}
                                width={'100%'}
                                onClick={(): void => {
                                    if (smUp) {
                                        setImageOpened(index);
                                    }
                                }}
                            />
                            {
                                <Typography variant={'caption'}>
                                    {captionsUnderImages && getTaggedCaption(captionsUnderImages[index])}
                                </Typography>
                            }
                        </Grid>
                    ) : (
                        <Grid key={`content_${index}`} item xs={12} sm={6} {...gridComponentProps}>
                            {item}
                        </Grid>
                    )
                )}
            </Grid>
            {captionArray.map((line, lineInd) => (
                <Typography key={`line_${lineInd}`} variant={'caption'} display={'block'}>
                    {getTaggedCaption(line)}
                </Typography>
            ))}
            {imageOpened !== -1 && smUp && (
                <div className={classes.fullScreenZoom} onClick={(): void => setImageOpened(-1)}>
                    <img className={classes.image} style={{ cursor: 'inherit' }} src={images[imageOpened] as string} />
                </div>
            )}
        </div>
    );
};
ImageGrid.displayName = 'ImageGrid';
