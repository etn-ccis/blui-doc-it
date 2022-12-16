import React, { useCallback, useEffect, useState } from 'react';
import { Typography, useMediaQuery, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { DRAWER_WIDTH, TOC_WIDTH, PAGE_WIDTH, getHash } from '../../shared';
import { useTOC } from '../../hooks/useTOC';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { SystemStyleObject } from '@mui/system';

type ToCProps = {
    anchors: Array<{ title: string; hash?: string; depth?: number }>;

    /**
     * Whether the first anchor passed in is pointing to the page top
     * When set to `true`, the first anchor is omitted for md and smaller sized screens
     * @default true
     */
    isFirstAnchorIntro?: boolean;
};

export const TOC: React.FC<ToCProps> = (props) => {
    const { anchors, isFirstAnchorIntro = true } = props;
    const isLgUp = useMediaQuery('(min-width: 1280px)');
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
        <Box
            sx={[
                {
                    borderLeft: { xs: `2px solid`, lg: 'none' },
                    color: 'divider',
                    py: { xs: 0, lg: 5 },
                    px: { xs: 2, lg: 1 },
                    my: { xs: 2, lg: 0 },
                    mx: 0,
                    maxWidth: TOC_WIDTH,
                    position: isLgUp ? 'fixed' : 'inherit',
                    top: 64,
                    left: `calc(50% + ${DRAWER_WIDTH}px*0.5 - ${TOC_WIDTH}px*0.5 - ${PAGE_WIDTH.REGULAR}px*0.5)`,
                },
                showBanner ? { top: { lg: 16 } } : {},
            ]}
        >
            <Typography sx={{ display: 'block', mb: 2, ml: { lg: 2 } }} variant={'overline'} color={'textSecondary'}>
                On This Page
            </Typography>
            {anchors.map(
                (anchor, index) =>
                    (isLgUp || !anchor.depth) && (
                        <Box
                            component={Link}
                            key={index}
                            replace
                            to={anchor.hash || `#${getHash(anchor.title)}`}
                            sx={[
                                {
                                    mb: 1,
                                    textDecoration: 'none',
                                    color: 'text.primary',
                                    display: 'block',
                                    borderLeftWidth: { xs: 0, lg: 2 },
                                    borderLeftStyle: 'solid',
                                    borderLeftColor: 'transparent',
                                    pl: { lg: 2 },
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                },
                                activeSection === index
                                    ? (t): SystemStyleObject => ({
                                          color: 'primary.main',
                                          fontWeight: 600,
                                          borderLeftColor:
                                              t.palette.mode === 'light' ? 'primary.light' : 'primary.dark',
                                      })
                                    : {},
                                isFirstAnchorIntro && index === 0 ? { display: { xs: 'none', lg: 'block' } } : {},
                                {
                                    pl: anchor.depth ? anchor.depth * 2 + 2 : undefined,
                                },
                            ]}
                        >
                            {anchor.title}
                        </Box>
                    )
            )}
        </Box>
    );
};
