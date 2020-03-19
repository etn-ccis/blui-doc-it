import React from 'react';
import { Grid, GridProps } from '@material-ui/core';
import * as Colors from '@pxblue/colors';

type Content = string | JSX.Element;
type ImageGridProps = GridProps & {
    images: Content[];
}
export const ImageGrid: React.FC<ImageGridProps> = (props): JSX.Element => {
    const { images, ...gridProps } = props;
    return (
        <Grid container spacing={2} justify={'center'} alignItems={'center'} wrap={'wrap'} {...gridProps}>
            {images.map((item, index) => (typeof item === 'string') ? (
                <Grid key={`content_${index}`} item xs={6} sm={4} md={3}>
                    <img src={item} width={'100%'} style={{border: `1px solid ${Colors.black[100]}`}}/>
                </Grid>

            ) : (
                    <Grid key={`content_${index}`} item xs={12} sm={8} md={6} >
                        {item}
                    </Grid>
                )
            )}
        </Grid>
    )
};
ImageGrid.displayName = 'ImageGrid';
