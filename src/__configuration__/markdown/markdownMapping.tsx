import React, { useState } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Snackbar from '@mui/material/Snackbar';
import { Theme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box, { BoxProps } from '@mui/material/Box';
import { Link as LinkIcon } from '@mui/icons-material';
import { Link, LinkProps } from 'react-router-dom';
import { REGULAR_WIDTH_STYLE, copyTextToClipboard, getHash } from '../../app/shared';
import * as Colors from '@brightlayer-ui/colors';
import color from 'color';
import clsx from 'clsx';
import './markdown.css';
import { MDXComponents } from 'mdx/types';
import { SystemStyleObject } from '@mui/system';

export const ExternalLink = (tProps: TypographyProps<'a'>): React.JSX.Element => {
    const theme = useTheme();
    return (
        <Typography
            component={'a'}
            target={'_blank'}
            rel={'noopener noreferrer'}
            style={{ fontWeight: 400, textDecoration: 'none', color: theme.palette.primary.main }}
            {...tProps}
        />
    );
};

export const InternalLink = (props: LinkProps): React.JSX.Element => {
    const theme = useTheme();
    return (
        <Link
            rel={'noopener noreferrer'}
            style={{ fontWeight: 400, textDecoration: 'none', color: theme.palette.primary.main }}
            {...props}
        />
    );
};

type Headline = BoxProps & {
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

    return (
        <Box
            className={clsx(className, 'headline')}
            {...otherDivProps}
            style={{ ...REGULAR_WIDTH_STYLE, ...otherDivProps.style }}
        >
            <span id={hash} style={{ position: 'relative', top: -90 }} />
            <Typography
                paragraph
                color={'primary'}
                component={'span'}
                {...otherTypographyProps}
                className={'headline-text'}
                style={{ hyphens: 'auto', ...otherTypographyProps.style }}
            >
                {otherTypographyProps.children}
                <IconButton
                    onClick={(): void => {
                        copyTextToClipboard(`${window.location.origin}${window.location.pathname}#${hash}`);
                        setOnCopy(true);
                    }}
                    style={{ marginLeft: 8 }}
                    size={'small'}
                    color={'primary'}
                >
                    <LinkIcon titleAccess={'copy to clipboard'} {...otherSvgIconProps} />
                </IconButton>
            </Typography>
            {onCopy && (
                <Snackbar
                    open={onCopy}
                    sx={{ bottom: { xs: 96, sm: 24 } }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={3000}
                    resumeHideDuration={1000}
                    onClose={(): void => setOnCopy(false)}
                    message={'Link copied to clipboard.'}
                />
            )}
        </Box>
    );
};

export const componentsMap: MDXComponents = {
    h1: (props): React.JSX.Element => (
        <Headline
            className={'markdownH1'}
            sx={{ mb: 4, hyphens: 'auto' }}
            hash={getHash(typeof props.children === 'string' ? props.children : 'h1')}
            TypographyProps={{ variant: 'h4', ...(props as TypographyProps) }}
        />
    ),
    h2: (props): React.JSX.Element => (
        <Headline
            sx={{ mt: 8, mb: 2 }}
            hash={getHash(typeof props.children === 'string' ? props.children : 'h2')}
            TypographyProps={{ variant: 'h6', ...(props as TypographyProps) }}
        />
    ),
    h3: (props): React.JSX.Element => (
        <Headline
            sx={{ mt: 4, mb: 2 }}
            hash={getHash(typeof props.children === 'string' ? props.children : 'h3')}
            TypographyProps={{ variant: 'body1', style: { fontWeight: 600 }, ...(props as TypographyProps) }}
        />
    ),
    h4: (props): React.JSX.Element => (
        <Headline
            sx={{ mt: 2 }}
            hash={getHash(typeof props.children === 'string' ? props.children : 'h4')}
            TypographyProps={{ variant: 'subtitle1', ...(props as TypographyProps) }}
        />
    ),
    h5: (props): React.JSX.Element => (
        <Headline
            sx={{ mt: 1 }}
            hash={getHash(typeof props.children === 'string' ? props.children : 'h5')}
            TypographyProps={{ variant: 'body2', ...(props as TypographyProps) }}
        />
    ),
    h6: (props): React.JSX.Element => (
        <Headline
            sx={{ mt: 1, fontSize: '0.75rem' }}
            hash={getHash(typeof props.children === 'string' ? props.children : 'h6')}
            TypographyProps={{ variant: 'body2', ...(props as TypographyProps) }}
        />
    ),
    a: (props): React.JSX.Element => {
        let tProps;
        if (props.href && (props.href.match(/^http/gi) || props.href.match(/^mailto/gi))) {
            tProps = props as TypographyProps<'a'>;
            return <ExternalLink {...tProps} />;
        }
        tProps = props as LinkProps;
        // @ts-ignore
        return <InternalLink to={props.href} {...tProps} />;
    },
    p: (props): React.JSX.Element => (
        <Typography sx={{ ...REGULAR_WIDTH_STYLE }} paragraph {...(props as TypographyProps)} />
    ),
    li: (props): React.JSX.Element => (
        <Typography
            component={'li'}
            className={'mdLi'}
            sx={{ ...REGULAR_WIDTH_STYLE }}
            {...(props as TypographyProps<'li'>)}
        />
    ),
    blockquote: (props): React.JSX.Element => (
        <Typography
            component={'blockquote'}
            sx={(theme): SystemStyleObject<Theme> => ({
                pr: 2,
                mb: 1,
                backgroundColor: color(theme.palette.primary.main).fade(0.9).string(),
                borderLeftColor: 'primary.main',
                ...REGULAR_WIDTH_STYLE,
            })}
            {...(props as TypographyProps<'blockquote'>)}
        />
    ),
    pre: (props): React.JSX.Element => (
        <Typography
            component={'pre'}
            color={'textPrimary'}
            sx={(theme): SystemStyleObject<Theme> => ({
                pr: 2,
                mb: 1,
                display: 'flex',
                fontSize: 12,
                backgroundColor:
                    theme.palette.mode === 'light' ? theme.palette.background.default : Colors.darkBlack[300],
                ...REGULAR_WIDTH_STYLE,
            })}
            {...(props as TypographyProps<'pre'>)}
        />
    ),
    code: (props): React.JSX.Element => (
        <Typography
            component={'code'}
            color={'textPrimary'}
            sx={(theme): SystemStyleObject<Theme> => ({
                backgroundColor:
                    theme.palette.mode === 'light' ? theme.palette.background.default : Colors.darkBlack[300],
                fontFamily: 'Roboto Mono, Monospaced',
                fontSize: 'inherit',
            })}
            {...(props as TypographyProps<'code'>)}
        />
    ),
    inlineCode: (props): React.JSX.Element => (
        <Typography
            component={'code'}
            color={'textPrimary'}
            sx={(theme): SystemStyleObject<Theme> => ({
                backgroundColor:
                    theme.palette.mode === 'light' ? theme.palette.background.default : Colors.darkBlack[300],
                fontFamily: 'Roboto Mono, Monospaced',
                border: theme.palette.mode === 'light' ? undefined : `${theme.palette.divider} 1px solid`,
            })}
            {...(props as TypographyProps<'code'>)}
        />
    ),
};
