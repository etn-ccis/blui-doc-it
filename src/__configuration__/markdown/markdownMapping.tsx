/* eslint-disable react/display-name */
import React, { HTMLAttributes, useState } from 'react';
import {
    Typography,
    TypographyProps,
    SvgIconProps,
    Snackbar,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import { Link, LinkProps } from 'react-router-dom';
import { REGULAR_WIDTH_STYLE, copyTextToClipboard } from '../../app/shared';
import * as Colors from '@pxblue/colors';
import clsx from 'clsx';
import './markdown.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        snackBarRoot: {
            [theme.breakpoints.down('xs')]: {
                bottom: theme.spacing(12),
            },
        },
    })
);

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

const getHash = (str: string): string =>
    str
        .replace(/ /g, '-')
        .replace(/[#?/&]/g, '')
        .toLowerCase();

type Headline = HTMLAttributes<HTMLDivElement> & {
    hash: string;
    TypographyProps: TypographyProps;
    SvgIconProps?: SvgIconProps;
};

const Headline: React.FC<Headline> = ({
    hash,
    className,
    TypographyProps: otherTypographyProps,
    SvgIconProps: otherSvgIconProps,
    ...otherDivProps
}) => {
    const [onCopy, setOnCopy] = useState(false);
    const classes = useStyles();
    return (
        <div
            className={clsx(className, 'headline')}
            onClick={(): void => {
                copyTextToClipboard(`${window.location.origin}${window.location.pathname}#${hash}`);
                setOnCopy(true);
            }}
            {...otherDivProps}
            style={{ ...REGULAR_WIDTH_STYLE, ...otherDivProps.style }}
        >
            <Typography
                paragraph
                color={'primary'}
                id={hash}
                component={'span'}
                {...otherTypographyProps}
                style={{ hyphens: 'auto', display: 'flex', ...otherTypographyProps.style }}
            >
                {otherTypographyProps.children}
                <LinkIcon
                    color={'action'}
                    style={{ marginLeft: 16, alignSelf: 'center' }}
                    titleAccess={'copy to clipboard'}
                    fontSize={'inherit'}
                    {...otherSvgIconProps}
                />
            </Typography>
            {onCopy && (
                <Snackbar
                    open={onCopy}
                    classes={{ root: classes.snackBarRoot }}
                    autoHideDuration={3000}
                    resumeHideDuration={1000}
                    onClose={(): void => setOnCopy(false)}
                    message={'Link copied to clipboard.'}
                />
            )}
        </div>
    );
};

export const componentsMap = {
    h1: (props: TypographyProps): JSX.Element => (
        <Headline
            className={'markdownH1'}
            style={{ marginBottom: 32 }}
            hash={getHash(props.children?.toString() || 'h1')}
            TypographyProps={{ variant: 'h4', ...props }}
        />
    ),
    h2: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 64, marginBottom: 16 }}
            hash={getHash(props.children?.toString() || 'h2')}
            TypographyProps={{ variant: 'h6', ...props }}
        />
    ),
    h3: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 32, marginBottom: 16 }}
            hash={getHash(props.children?.toString() || 'h3')}
            TypographyProps={{ variant: 'body1', style: { fontWeight: 600 }, ...props }}
        />
    ),
    h4: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 16 }}
            hash={getHash(props.children?.toString() || 'h4')}
            TypographyProps={{ variant: 'subtitle1', ...props }}
        />
    ),
    h5: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 8 }}
            hash={getHash(props.children?.toString() || 'h5')}
            TypographyProps={{ variant: 'body2', ...props }}
        />
    ),
    h6: (props: TypographyProps): JSX.Element => (
        <Headline
            style={{ marginTop: 8, fontSize: '0.75rem' }}
            hash={getHash(props.children?.toString() || 'h6')}
            TypographyProps={{ variant: 'body2', ...props }}
        />
    ),
    a: (props: TypographyProps<'a'> | LinkProps): JSX.Element => {
        let tProps;
        if (props.href && (props.href.match(/^http/gi) || props.href.match(/^mailto/gi))) {
            tProps = props as TypographyProps<'a'>;
            return <ExternalLink {...tProps} />;
        }
        tProps = props as LinkProps;
        // @ts-ignore
        return <InternalLink to={props.href} {...tProps} />;
    },
    p: (props: TypographyProps): JSX.Element => <Typography style={{ ...REGULAR_WIDTH_STYLE }} paragraph {...props} />,
    li: (props: TypographyProps<'li'>): JSX.Element => (
        <Typography component={'li'} className={'mdLi'} style={{ ...REGULAR_WIDTH_STYLE }} {...props} />
    ),
    blockquote: (props: TypographyProps<'blockquote'>): JSX.Element => (
        <Typography
            component={'blockquote'}
            style={{ paddingRight: 16, marginBottom: 8, ...REGULAR_WIDTH_STYLE }}
            {...props}
        />
    ),
    pre: (props: TypographyProps<'pre'>): JSX.Element => (
        <Typography
            component={'pre'}
            style={{ paddingRight: 16, marginBottom: 8, display: 'flex', ...REGULAR_WIDTH_STYLE }}
            {...props}
        />
    ),
};
