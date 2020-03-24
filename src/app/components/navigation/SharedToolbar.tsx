import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    AppBar,
    // Tabs,
    // Tab,
    Toolbar,
    ListItemText,
    AppBarProps,
    Hidden,
    useTheme,
    useMediaQuery,
    IconButton,
} from '@material-ui/core';
// import { NavLink } from '../components';
import { PxblueSmall } from '@pxblue/icons-mui';
import { Spacer } from '@pxblue/react-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
// import { useHistory, useLocation } from 'react-router-dom';

export type SharedToolbarProps = AppBarProps & {
    title?: string;
    color?: 'primary' | 'secondary' | 'default';
    subtitle?: string;
    navigationIcon?: JSX.Element;
};

export const SharedToolbar = (props: SharedToolbarProps): JSX.Element => {
    const { title, color, subtitle, navigationIcon, ...other } = props;
    // const location = useLocation();
    const theme = useTheme();
    // const history = useHistory();
    // const [activeRoute, setActiveRoute] = useState(location.pathname);
    const [hasShadow, setShadow] = useState(false);
    const icon = navigationIcon ? navigationIcon : <PxblueSmall />;
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
    const history = useHistory();
    const isLandingPage = history.location.pathname === '/';
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const dispatch = useDispatch();

    const _navigationIcon = useCallback(
        () => (
            <Hidden mdUp={navigationIcon !== undefined && !isLandingPage}>
                <IconButton
                    color={'inherit'}
                    onClick={(): void => {
                        dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: theme.spacing(0.5),
                        marginLeft: theme.spacing(-1.5)
                    }}
                >
                    {icon}
                </IconButton>
            </Hidden>
        ),
        [navigationIcon]
    );

    // TODO: Revisit this when the DrawerLayout is fixed - this is going to be goofy on the pages with multiple appbars
    useEffect(() => {
        const updateShadow = (e: Event): void => {
            if (e && matchesSM && window.scrollY > 20) {
                setShadow(true);
            } else {
                setShadow(false);
            }
        };
        window.addEventListener('scroll', updateShadow);
        return (): void => {
            window.removeEventListener('scroll', updateShadow);
        };
    });

    return (
        <>
            <AppBar position="sticky" color={color} elevation={0} style={{ zIndex: 1000 }} {...other}>
                <Toolbar
                    style={{ padding: `0 ${theme.spacing(2)}px`, boxShadow: hasShadow ? theme.shadows[12] : undefined }}
                >
                    {_navigationIcon()}
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
                            Power Xpert <b>Blue</b>
                        </Typography>
                    )}
                    <Spacer />
                    {/* <Hidden xsDown>
                        <div
                            style={{ display: 'flex', flexWrap: 'wrap', flex: '1 1 auto', justifyContent: 'flex-end' }}
                        >
                            <NavLink to={'/overview'} title={'Getting Started'} />
                            <NavLink to={'/style/color'} title={'Styles'} />
                            <NavLink to={'/patterns/appbars'} title={'Patterns'} />
                            <NavLink to={'/resources'} title={'Resources'} />
                        </div>
                    </Hidden> */}
                </Toolbar>
            </AppBar>
            {/* <Hidden smUp>
                <AppBar position="sticky" color={'primary'} style={{ top: 56 }}>
                    <Tabs
                        variant={'fullWidth'}
                        value={
                            activeRoute.startsWith('/overview')
                                ? '/overview'
                                : activeRoute.startsWith('/style')
                                ? '/style'
                                : activeRoute.startsWith('/patterns')
                                ? '/patterns'
                                : activeRoute.startsWith('/resources')
                                ? '/resources'
                                : false
                        }
                    >
                        <Tab
                            label="Getting Started"
                            value={'/overview'}
                            onClick={(): void => {
                                history.push('/overview');
                                setActiveRoute('/overview');
                            }}
                        />
                        <Tab
                            label="Styles"
                            value={'/style'}
                            onClick={(): void => {
                                history.push('/style/color');
                                setActiveRoute('/style');
                            }}
                        />
                        <Tab
                            label="Patterns"
                            value={'/patterns'}
                            onClick={(): void => {
                                history.push('/patterns/appbars');
                                setActiveRoute('/patterns');
                            }}
                        />
                        <Tab
                            label="Resources"
                            value={'/resources'}
                            onClick={(): void => {
                                history.push('/resources');
                                setActiveRoute('/resources');
                            }}
                        />
                    </Tabs>
                </AppBar>
            </Hidden> */}
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
