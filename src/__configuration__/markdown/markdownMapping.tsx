/* eslint-disable react/display-name */
import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';
import { Link, LinkProps } from 'react-router-dom';

export const componentsMap = {
    h1: (props: TypographyProps): JSX.Element => <Typography paragraph variant={'h4'} color={'primary'} {...props} />,
    h2: (props: TypographyProps): JSX.Element => <Typography paragraph variant={'h5'} color={'primary'} {...props} />,
    h3: (props: TypographyProps): JSX.Element => <Typography paragraph variant={'h6'} color={'primary'} {...props} />,
    h4: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'subtitle1'} color={'primary'} {...props} />
    ),
    h5: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'body2'} color={'primary'} {...props} />
    ),
    h6: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'body2'} style={{ fontSize: '0.75rem' }} color={'primary'} {...props} />
    ),
    a: (props: TypographyProps<'a'> | LinkProps): JSX.Element => {
        let tProps;
        if (props.href && props.href.match(/^http/gi)) {
            tProps = props as TypographyProps<'a'>;
            return (
                <Typography
                    component={'a'}
                    target={'_blank'}
                    rel="noopener noreferrer"
                    style={{ fontWeight: 600, textDecoration: 'none', color: '#007bc1' }}
                    {...tProps}
                />
            );
        }
        tProps = props as LinkProps;
        return (
            <Link
                to={props.href}
                rel="noopener noreferrer"
                style={{ fontWeight: 600, textDecoration: 'none', color: '#007bc1' }}
                {...tProps}
            />
        );
    },
    p: (props: TypographyProps): JSX.Element => <Typography paragraph {...props} />,
    li: (props: TypographyProps<'li'>): JSX.Element => <Typography component={'li'} className={'mdLi'} {...props} />,
};
