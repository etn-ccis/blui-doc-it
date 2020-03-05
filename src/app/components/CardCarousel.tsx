import React from 'react';
import { IconButton, Typography, makeStyles, createStyles, useMediaQuery, Theme } from '@material-ui/core';
import Carousel from '@brainhubeu/react-carousel';
import * as Colors from '@pxblue/colors';

import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import '@brainhubeu/react-carousel/lib/style.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardWrapper: {
            width: '100%',
            backgroundSize: 'cover',
        },
        cardBody: {
            height: '100%',
            width: '100%',
            padding: theme.spacing(6),
            background: 'rgba(29, 37, 41, 0.8)',
            color: Colors.white[50],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
                background: (props: CarouselCardProps): string =>
                    props.onClick ? 'rgba(29, 37, 41, 0.6)' : 'rgba(29, 37, 41, 0.8)',
            },
        },
        textWrapper: {
            maxWidth: 300,
        },
    })
);

type CarouselCardProps = {
    height?: number;
    backgroundImage?: string;
    title: string;
    description: string;
    onClick?: Function;
};

export const CarouselCard: React.FC<CarouselCardProps> = (props): JSX.Element => {
    const classes = useStyles(props);
    return (
        <div
            className={classes.cardWrapper}
            style={{
                height: props.height,
                backgroundImage: `url(${props.backgroundImage})`,
                cursor: props.onClick ? 'pointer' : 'default',
            }}
            onClick={(): void => {
                if (props.onClick !== undefined) {
                    props.onClick();
                }
            }}
        >
            <div className={classes.cardBody}>
                <div className={classes.textWrapper}>
                    <Typography variant={'h6'} style={{ display: 'flex', alignItems: 'center' }}>
                        {props.title}
                    </Typography>
                    <Typography variant={'body2'}>{props.description}</Typography>
                </div>
            </div>
        </div>
    );
};
CarouselCard.displayName = 'CarouselCard';
CarouselCard.defaultProps = {
    height: 450,
};

type CardCarouselProps = {
    infinite?: boolean;
    slidesPerPage?: number;
};
export const CardCarousel: React.FC<CardCarouselProps> = (props): JSX.Element => {
    const xs = useMediaQuery('(max-width:599px)');
    const displayCount = xs ? 1 : props.slidesPerPage || 2;
    const isArray = Array.isArray(props.children);
    const showArrows = isArray ? (props.children as any[]).length > displayCount : false;
    return (
        <Carousel
            draggable={false}
            infinite={isArray && props.infinite}
            slidesPerPage={displayCount}
            arrowLeft={
                showArrows ? (
                    <IconButton color={'inherit'}>
                        <ChevronLeft fontSize={'large'} />
                    </IconButton>
                ) : (
                    undefined
                )
            }
            arrowRight={
                showArrows ? (
                    <IconButton color={'inherit'}>
                        <ChevronRight fontSize={'large'} />
                    </IconButton>
                ) : (
                    undefined
                )
            }
            addArrowClickHandler
        >
            {props.children}
        </Carousel>
    );
};
CardCarousel.displayName = 'CardCarousel';
CardCarousel.defaultProps = {
    infinite: true,
    slidesPerPage: 2,
};
