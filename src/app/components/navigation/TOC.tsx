import React, { useCallback, useEffect, useState } from 'react';
import { Theme, Typography, useTheme, useMediaQuery, SxProps, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { DRAWER_WIDTH, TOC_WIDTH, PAGE_WIDTH, getHash } from '../../shared';
import { useTOC } from '../../hooks/useTOC';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';

type ToCProps = {
    anchors: Array<{ title: string; hash?: string; depth?: number }>;

    /**
     * Whether the first anchor passed in is pointing to the page top
     * When set to `true`, the first anchor is omitted for md and smaller sized screens
     * @default true
     */
    isFirstAnchorIntro?: boolean;
};

const styles: { [key: string]: SxProps<Theme> } = {
    root: {
        borderLeft: { xs: `2px solid`, lg: 'none' },
        borderLeftColor: 'divider',
        py: { xs: 0, lg: 5 },
        px: { xs: 2, lg: 1 },
        my: { xs: 2, lg: 0 },
        mx: 0,
        maxWidth: TOC_WIDTH,
        position: { xs: undefined, lg: 'fixed' },
        top: 64,
        left: `calc(50% + ${DRAWER_WIDTH}px*0.5 - ${TOC_WIDTH}px*0.5 - ${PAGE_WIDTH.REGULAR}px*0.5)`,
    },
    rootWithBanner: {
        top: { lg: 16 },
    },
    onThisPage: {
        display: 'block',
        mb: 2,
        ml: { lg: 2 },
    },
    link: (theme) => ({
        mb: 1,
        textDecoration: 'none',
        color: 'text.primary',
        display: 'block',
        '&:hover': {
            color: 'primary.main',
        },
        borderLeft: { lg: `2px solid transparent` },
        pl: { lg: 2 },
        // TODO: Fix this style
        '&$activeLink': {
            color: 'primary.main',
            fontWeight: 600,
            borderLeft: `2px solid ${
                theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark
            }`,
        },
    }),
    activeLink: {},
    hideIntro: {
        display: { xs: 'none', lg: 'block' },
    },
};

export const TOC: React.FC<ToCProps> = (props) => {
    const { anchors, isFirstAnchorIntro = true } = props;
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { pathname, hash } = useLocation();
    const [activeSection, setActiveSection] = useState(0);
    const [sectionOffsetTop, setSectionOffsetTop] = useState<number[]>([]);
    const showBanner = useSelector((state: AppState) => state.app.showBanner);
    useTOC(true);

    const initializeSectionOffsetTop = useCallback(() => {
        // go through all the section anchors, read their offsetTop values
        const anchorTops: number[] = [];
        anchors.forEach((anchor) => {
            const anchorHash = anchor.hash?.slice(1) || getHash(anchor.title);
            const sectionAnchor = document.getElementById(anchorHash);
            if (sectionAnchor) {
                anchorTops.push(sectionAnchor.offsetTop - 200); // add a bit more scroll padding
            } else {
                anchorTops.push(0);
            }
        });
        setSectionOffsetTop(anchorTops);
    }, [anchors, pathname, setSectionOffsetTop]);

    /** Change the active section */
    const calculateAndSetActiveSection = useCallback((): void => {
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
    }, [sectionOffsetTop, initializeSectionOffsetTop]);

    useEffect(() => {
        window.addEventListener('load', initializeSectionOffsetTop);
        window.addEventListener('scroll', calculateAndSetActiveSection);

        return (): void => {
            window.removeEventListener('load', initializeSectionOffsetTop);
            window.removeEventListener('scroll', calculateAndSetActiveSection);
        };
    }, [sectionOffsetTop, initializeSectionOffsetTop, calculateAndSetActiveSection]);

    useEffect(() => {
        initializeSectionOffsetTop();

        // an initial positioning, in case some people got impatient
        const timer1000 = setTimeout((): void => {
            initializeSectionOffsetTop();
        }, 1000);
        // wait for the images to load on a regular internet
        const timer3000 = setTimeout((): void => {
            initializeSectionOffsetTop();
        }, 3000);
        // another one to account for slower internet
        const timer10000 = setInterval((): void => {
            initializeSectionOffsetTop();
        }, 10000);
        return (): void => {
            clearTimeout(timer1000);
            clearTimeout(timer3000);
            clearTimeout(timer10000);
        };
    }, [pathname, hash]);

    useEffect(() => {
        calculateAndSetActiveSection();
    }, [sectionOffsetTop]);

    return (
        // @ts-ignore TODO: fix this style merge
        <Box
            // @ts-ignore TODO: fix this style merge
            sx={{
                ...styles.root,
                ...(showBanner ? styles.rootWithBanner : {}),
            }}
        >
            <Typography sx={styles.onThisPage} variant={'overline'} color={'textSecondary'}>
                On This Page
            </Typography>
            {anchors.map(
                (anchor, index) =>
                    (isLgUp || !anchor.depth) && (
                        <Box
                            component={Link}
                            key={index}
                            to={anchor.hash || `#${getHash(anchor.title)}`}
                            // @ts-ignore TODO: fix this style merge
                            sx={{
                                ...styles.link,
                                ...(activeSection === index ? styles.activeLink : {}),
                                ...(isFirstAnchorIntro && index === 0 ? styles.hideIntro : {}),
                            }}
                            style={{ paddingLeft: anchor.depth ? theme.spacing(anchor.depth * 2 + 2) : undefined }}
                            replace
                        >
                            {anchor.title}
                        </Box>
                    )
            )}
        </Box>
    );
};
