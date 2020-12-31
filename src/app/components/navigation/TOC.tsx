import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { DRAWER_WIDTH, TOC_WIDTH, PAGE_WIDTH } from '../../shared';
import clsx from 'clsx';

type ToCProps = {
    anchors: Array<{ title: string; hash: string }>;

    /**
     * Whether the first anchor passed in is pointing to the page top
     * When set to `true`, the first anchor is omitted for md and smaller sized screens
     * @default true
     */
    isFirstAnchorIntro?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: `0 ${theme.spacing(2)}px`,
            margin: `${theme.spacing(2)}px 0`,
            maxWidth: TOC_WIDTH,
            [theme.breakpoints.up('lg')]: {
                borderLeft: 'none',
                padding: `${theme.spacing(5)}px ${theme.spacing(1)}px`,
                margin: 0,
                position: 'fixed',
                top: theme.spacing(8),
                left: `calc(50% + ${DRAWER_WIDTH}px*0.5 - ${TOC_WIDTH}px*0.5 - ${PAGE_WIDTH.REGULAR}px*0.5)`,
            },
        },
        onThisPage: {
            display: 'block',
            marginBottom: theme.spacing(2),
            [theme.breakpoints.up('lg')]: {
                marginLeft: theme.spacing(2),
            },
        },
        link: {
            marginBottom: theme.spacing(),
            textDecoration: 'none',
            color: theme.palette.text.primary,
            display: 'block',
            '&:hover': {
                color: theme.palette.primary.main,
            },
            [theme.breakpoints.up('lg')]: {
                borderLeft: `2px solid transparent`,
                paddingLeft: theme.spacing(2),
                '&$activeLink': {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    borderLeft: `2px solid ${
                        theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
                    }`,
                },
            },
        },
        activeLink: {},
        hideIntro: {
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
    })
);

export const TOC: React.FC<ToCProps> = (props) => {
    const { anchors, isFirstAnchorIntro = true } = props;
    const classes = useStyles();
    const { pathname, hash } = useLocation();
    const [activeSection, setActiveSection] = useState(-1);
    const [sectionOffsetTop, setSectionOffsetTop] = useState<number[]>([]);

    const initializeSectionOffsetTop = useCallback(() => {
        // go through all the section anchors, read their offsetTop values
        const anchorTops: number[] = [];
        anchors.forEach((anchor) => {
            const sectionAnchor = document.getElementById(anchor.hash.slice(1));
            if (sectionAnchor) {
                anchorTops.push(sectionAnchor.offsetTop - 200); // add a bit more scroll padding
            } else {
                anchorTops.push(0);
            }
        });
        setSectionOffsetTop(anchorTops);
    }, [anchors]);

    /** Change the active section */
    const scrollHandler = useCallback((): void => {
        const scrollY = window.scrollY;
        for (let i = 0; i < sectionOffsetTop.length; i++) {
            // find the first Y value on the list smaller than scrollY

            if (i !== sectionOffsetTop.length - 1) {
                if (sectionOffsetTop[i] <= scrollY && scrollY < sectionOffsetTop[i + 1]) {
                    setActiveSection(i);
                    return;
                }
            } else {
                if (sectionOffsetTop[i] <= scrollY) {
                    setActiveSection(i);
                    return;
                }
            }
        }
    }, [sectionOffsetTop]);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('load', initializeSectionOffsetTop);

        return (): void => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('load', initializeSectionOffsetTop);
        };
    }, [sectionOffsetTop]);

    useEffect(() => {
        initializeSectionOffsetTop();
    }, [pathname, hash]);

    return (
        <div className={classes.root}>
            <Typography className={classes.onThisPage} variant={'overline'} color={'textSecondary'}>
                On This Page
            </Typography>
            {anchors.map((anchor, index) => (
                <Link
                    key={index}
                    to={anchor.hash}
                    className={clsx(classes.link, {
                        [classes.activeLink]: activeSection === index,
                        [classes.hideIntro]: isFirstAnchorIntro && index === 0,
                    })}
                    replace
                >
                    {anchor.title}
                </Link>
            ))}
        </div>
    );
};