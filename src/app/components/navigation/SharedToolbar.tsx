import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    AppBar,
    Toolbar,
    ListItemText,
    AppBarProps,
    Hidden,
    IconButton,
    Theme,
    useTheme,
    useMediaQuery,
    SxProps,
} from '@mui/material';
import { PxblueSmall } from '@brightlayer-ui/icons-mui';
import { Spacer } from '@brightlayer-ui/react-components';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_DRAWER, TOGGLE_SEARCH } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
import Search from '@mui/icons-material/Search';
import { SearchBar } from '../../pages';
import { PADDING } from '../../shared';
import { getScheduledSiteConfig } from '../../../__configuration__/themes';
import FireworksCanvas from 'fireworks-canvas';

export type SharedToolbarProps = AppBarProps & {
    title?: string;
    color?: 'primary' | 'secondary' | 'default';
    subtitle?: string;
    navigationIcon?: JSX.Element;
};

const styles: { [key: string]: SxProps<Theme> } = {
    menuIconButton: {
        display: 'flex',
        alignItems: 'center',
        mr: 0.5,
    },
    toolbar: {
        display: 'flex',
        py: 0,
        px: { xs: 0, sm: `${PADDING}px` },
    },
};

export const SharedToolbar = (props: SharedToolbarProps): JSX.Element => {
    const { title, color, subtitle, navigationIcon, ...other } = props;
    const icon = navigationIcon ? navigationIcon : <PxblueSmall />;
    const location = useLocation();
    const theme = useTheme();
    const isLandingPage = location.pathname === '/';
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const sidebarOpen = useSelector((state: AppState) => state.app.sidebarOpen);
    const showBanner = useSelector((state: AppState) => state.app.showBanner);
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const appBarBackground = getScheduledSiteConfig().appBarBackground;
    const getIsFireworkHoliday = (): boolean => {
        const holidayClassName = getScheduledSiteConfig().className || '';
        const fireworkHolidays = ['independence-day'];

        if (fireworkHolidays.includes(holidayClassName)) {
            return true;
        }
        return false;
    };

    const getNavigationIcon = useCallback(
        () => (
            <Hidden mdUp={navigationIcon !== undefined && !isLandingPage}>
                <IconButton
                    color={'inherit'}
                    onClick={(): void => {
                        dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                    }}
                    sx={styles.menuIconButton}
                    edge={'start'}
                >
                    {icon}
                </IconButton>
            </Hidden>
        ),
        [navigationIcon]
    );

    useEffect(() => {
        if (getIsFireworkHoliday()) {
            const fireworksContainer: HTMLElement =
                document.getElementById('fireworks') || document.createElement('div');
            fireworksContainer.innerHTML = '';
            const fireworks = new FireworksCanvas(fireworksContainer, {
                maxRockets: 3,
                rocketSpawnInterval: 600,
                numParticles: 150,
                explosionMinHeight: 0.2,
                explosionMaxHeight: 0.9,
                explosionChance: 0.02,
            });
            fireworks.start();
        }
    }, []);

    // TODO: Revisit this when the DrawerLayout is fixed - this is going to be goofy on the pages with multiple appbars
    // useEffect(() => {
    //     const updateShadow = (e: Event): void => {
    //         if (e && matchesSM && window.scrollY > 20) {
    //             setShadow(true);
    //         } else {
    //             setShadow(false);
    //         }
    //     };
    //     window.addEventListener('scroll', updateShadow);
    //     return (): void => {
    //         window.removeEventListener('scroll', updateShadow);
    //     };
    // });

    return (
        <>
            <AppBar
                position="sticky"
                color={color}
                elevation={0}
                sx={{
                    zIndex: 1000,
                    width: `calc(100% - ${sidebarOpen ? (sm ? 0 : 350) : 0}px)`,
                    right: sidebarOpen ? (sm ? 0 : 350) : 0,
                    transition: `width ${theme.transitions.duration.standard} ${theme.transitions.easing.easeInOut}`,
                    top: showBanner ? theme.spacing(sm ? 7 : 8) : 0,
                    ...appBarBackground,
                }}
                {...other}
            >
                {getIsFireworkHoliday() && (
                    <div
                        id="fireworks"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: 'hidden',
                        }}
                    ></div>
                )}
                <Toolbar sx={styles.toolbar}>
                    {getNavigationIcon()}
                    {props.title ? (
                        <ListItemText
                            id={'dropdown-toolbar-text'}
                            primary={
                                <Typography variant={'h6'} style={{ fontWeight: 600, lineHeight: 1 }}>
                                    {title}
                                </Typography>
                            }
                            secondary={subtitle}
                        />
                    ) : (
                        <Typography>
                            Brightlayer <b>User Interface</b>
                        </Typography>
                    )}
                    <Spacer />
                    <IconButton
                        color={'inherit'}
                        onClick={(): void => {
                            dispatch({ type: TOGGLE_SEARCH, payload: true });
                        }}
                        edge={'end'}
                    >
                        <Search />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SearchBar />
        </>
    );
};
SharedToolbar.propTypes = {
    title: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'default']),
    subtitle: PropTypes.string,
    navigationIcon: PropTypes.element,
};
SharedToolbar.defaultProps = {
    color: 'primary',
};
