import React, { useState } from 'react';
import { Grid, GridProps, makeStyles, createStyles, Typography, Theme, useTheme, Hidden } from '@material-ui/core';
import * as Colors from '@pxblue/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(3),
        },
        grid: {
            backgroundColor: theme.palette.type === 'light' ? Colors.black[50] : Colors.black[900],
        },
        image: {
            boxShadow: theme.shadows[2],
            cursor: 'zoom-in',
            maxHeight: '100%',
            maxWidth: '100%',
        },
        fullScreenZoom: {
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: theme.palette.type === 'light' ? '#fffd' : '#000a',
            display: 'flex',
            zIndex: 1001,
            cursor: 'zoom-out',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);

type Content = string | JSX.Element;
type ImageGridProps = GridProps & {
    images: Content[];
    caption?: string;
};
export const ImageGrid: React.FC<ImageGridProps> = (props): JSX.Element => {
    const { images, caption, ...gridProps } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [imageOpened, setImageOpened] = useState(-1);
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                justify={'center'}
                alignItems={'center'}
                wrap={'wrap'}
                {...gridProps}
                className={classes.grid}
                style={{ marginBottom: theme.spacing(2) }}
            >
                {images.map((item, index) =>
                    typeof item === 'string' ? (
                        <Grid key={`content_${index}`} item xs={12} sm={6} md={4}>
                            <img
                                className={classes.image}
                                src={item}
                                width={'100%'}
                                onClick={(): void => setImageOpened(index)}
                            />
                        </Grid>
                    ) : (
                        <Grid key={`content_${index}`} item xs={12} sm={8} md={6}>
                            {item}
                        </Grid>
                    )
                )}
            </Grid>
            <Typography variant={'caption'}>{caption}</Typography>
            {imageOpened !== -1 && (
                <Hidden xsDown>
                    <div className={classes.fullScreenZoom} onClick={(): void => setImageOpened(-1)}>
                        <img
                            className={classes.image}
                            style={{ cursor: 'inherit' }}
                            src={images[imageOpened] as string}
                        />
                    </div>
                </Hidden>
            )}
        </div>
    );
};
ImageGrid.displayName = 'ImageGrid';
