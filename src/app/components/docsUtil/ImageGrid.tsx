import React, { useState, HTMLAttributes } from 'react';
import {
    Grid,
    GridProps,
    makeStyles,
    createStyles,
    Typography,
    Theme,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';
import TaggedCaption from './rules/TaggedCaption';

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
            return <TaggedCaption tag={`DON'T`} captionText={captionText.slice(5)} />;
        }
        if (captionText.startsWith('AVOID:')) {
            return <TaggedCaption tag={`AVOID`} captionText={captionText.slice(6)} />;
        }
        if (captionText.startsWith('CAUTION:')) {
            return <TaggedCaption tag={`CAUTION`} captionText={captionText.slice(8)} />;
        }
        if (captionText.startsWith('DO:')) {
            return <TaggedCaption tag={`DO`} captionText={captionText.slice(3)} />;
        }
        return captionText;
    }, []);

    return (
        <div className={classes.root} {...rootProps}>
            <Grid
                container
                spacing={2}
                alignItems={'flex-start'}
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
