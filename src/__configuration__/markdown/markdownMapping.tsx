/* eslint-disable react/display-name */
import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';
import { Link, LinkProps } from 'react-router-dom';
import './markdown.css';

export const ExternalLink = (tProps: TypographyProps<'a'>): JSX.Element => (
    <Typography
        component={'a'}
        target={'_blank'}
        rel="noopener noreferrer"
        style={{ fontWeight: 600, textDecoration: 'none', color: '#007bc1' }}
        {...tProps}
    />
);

export const InternalLink = (props: LinkProps): JSX.Element => (
    <Link rel="noopener noreferrer" style={{ fontWeight: 600, textDecoration: 'none', color: '#007bc1' }} {...props} />
);

export const componentsMap = {
    h1: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'h4'} color={'primary'} className={'markdownH1'} {...props} />
    ),
    h2: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'h5'} color={'primary'} {...props} style={{ marginTop: 48 }} />
    ),
    h3: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'h6'} color={'primary'} {...props} style={{ marginTop: 24 }} />
    ),
    h4: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'subtitle1'} color={'primary'} {...props} style={{ marginTop: 16 }} />
    ),
    h5: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'body2'} color={'primary'} {...props} style={{ marginTop: 8 }} />
    ),
    h6: (props: TypographyProps): JSX.Element => (
        <Typography
            paragraph
            variant={'body2'}
            style={{ fontSize: '0.75rem', marginTop: 8 }}
            color={'primary'}
            {...props}
        />
    ),
    a: (props: TypographyProps<'a'> | LinkProps): JSX.Element => {
        let tProps;
        if (props.href && props.href.match(/^http/gi)) {
            tProps = props as TypographyProps<'a'>;
            return <ExternalLink {...tProps} />;
        }
        tProps = props as LinkProps;
        return <InternalLink to={props.href} {...tProps} />;
    },
    p: (props: TypographyProps): JSX.Element => <Typography paragraph {...props} />,
    li: (props: TypographyProps<'li'>): JSX.Element => <Typography component={'li'} className={'mdLi'} {...props} />,
};
