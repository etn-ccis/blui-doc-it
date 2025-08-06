import React, { useState, HTMLAttributes } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import TaggedCaption from './rules/TaggedCaption';

const styles: Record<string, SxProps<Theme>> = {
    root: {
        mb: 5,
    },
    image: {
        border: `1px solid`,
        borderColor: 'divider',
        maxHeight: '100%',
        maxWidth: '100%',
        cursor: { xs: 'default', sm: 'zoom-in' },
    },
    fullScreenZoom: (theme) => ({
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: theme.palette.mode === 'light' ? '#fffd' : '#000a',
        display: 'flex',
        zIndex: 'modal',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: { xs: 'default', sm: 'zoom-out' },
        p: 2,
    }),
};

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
        <Box sx={styles.root} {...rootProps}>
            <Grid
                container
                spacing={2}
                alignItems={'flex-start'}
                wrap={'wrap'}
                sx={{ mb: 0.5 }}
                {...gridContainerProps}
            >
                {images.map((item, index) =>
                    typeof item === 'string' ? (
                        <Grid key={`content_${index}`} size={{ xs: 12, sm: fullSize ? 12 : 6 }} {...gridImageProps}>
                            <Box
                                component={'img'}
                                sx={styles.image}
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
                        <Grid key={`content_${index}`} size={{ xs: 12, sm: 6 }} {...gridComponentProps}>
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
                <Box sx={styles.fullScreenZoom} onClick={(): void => setImageOpened(-1)}>
                    <Box
                        component={'img'}
                        sx={styles.image}
                        style={{ cursor: 'inherit' }}
                        src={images[imageOpened] as string}
                    />
                </Box>
            )}
        </Box>
    );
};
ImageGrid.displayName = 'ImageGrid';
