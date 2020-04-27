/* eslint-disable react/display-name */
import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';
import { Link, LinkProps } from 'react-router-dom';
import './markdown.css';
import * as Colors from '@pxblue/colors';

export const ExternalLink = (tProps: TypographyProps<'a'>): JSX.Element => (
    <Typography
        component={'a'}
        target={'_blank'}
        rel="noopener noreferrer"
        style={{ fontWeight: 400, textDecoration: 'none', color: Colors.blue[500] }}
        {...tProps}
    />
);

export const InternalLink = (props: LinkProps): JSX.Element => (
    <Link
        rel="noopener noreferrer"
        style={{ fontWeight: 400, textDecoration: 'none', color: Colors.blue[500] }}
        {...props}
    />
);

export const componentsMap = {
    h1: (props: TypographyProps): JSX.Element => (
        <Typography
            paragraph
            variant={'h4'}
            color={'primary'}
            className={'markdownH1'}
            style={{ marginBottom: 32 }}
            {...props}
        />
    ),
    h2: (props: TypographyProps): JSX.Element => (
        <Typography paragraph variant={'h6'} color={'primary'} {...props} style={{ marginTop: 64, marginBottom: 16 }} />
    ),
    h3: (props: TypographyProps): JSX.Element => (
        <Typography
            paragraph
            variant={'body1'}
            color={'primary'}
            {...props}
            style={{ fontWeight: 600, marginTop: 32 }}
        />
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
    blockquote: (props: TypographyProps<'blockquote'>): JSX.Element => (
        <Typography component={'blockquote'} style={{ paddingRight: 16, marginBottom: 8 }} {...props} />
    ),
};
