import React, { useState, HTMLAttributes } from 'react';
import { ListItemTag } from '@brightlayer-ui/react-components';
import { Grid, GridProps, Typography, Theme, useTheme, useMediaQuery, SxProps, Box, PaletteMode } from '@mui/material';
import { PaletteColor } from '@mui/material/styles/createPalette';
import { orange } from '@brightlayer-ui/colors';

const styles: { [key: string]: SxProps<Theme> } = {
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

const getColoredCaption = (
    captionText: string,
    tag: string,
    palette: PaletteColor,
    themeType: PaletteMode,
    title: string
): React.ReactNode => (
    <>
        <Box
            sx={{
                backgroundColor: palette[themeType],
                width: '100%',
                height: 12,
                mb: 1,
            }}
        ></Box>
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
                theme.palette.mode,
                'Under no circumstance should this ever be used.'
            );
        }
        if (captionText.startsWith('AVOID:')) {
            return getColoredCaption(
                captionText.slice(6),
                `AVOID`,
                { light: orange[100], main: orange[500], dark: orange[900], contrastText: 'black' },
                theme.palette.mode,
                'Strong justifications are needed to carry design this way.'
            );
        }
        if (captionText.startsWith('CAUTION:')) {
            return getColoredCaption(
                captionText.slice(8),
                `CAUTION`,
                theme.palette.warning,
                theme.palette.mode,
                'Must explore other design possibilities before choosing this path.'
            );
        }
        if (captionText.startsWith('DO:')) {
            return getColoredCaption(
                captionText.slice(3),
                `DO`,
                theme.palette.success,
                theme.palette.mode,
                'We encourage you to design this way, and this is common in other applications using this design system too.'
            );
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
                        <Grid key={`content_${index}`} item xs={12} sm={fullSize ? 12 : 6} {...gridImageProps}>
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
