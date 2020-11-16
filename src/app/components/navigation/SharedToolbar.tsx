import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    AppBar,
    Toolbar,
    ListItemText,
    AppBarProps,
    Hidden,
    IconButton,
    makeStyles,
    Theme,
    createStyles,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';
import { PxblueSmall } from '@pxblue/icons-mui';
import { Spacer } from '@pxblue/react-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_DRAWER, TOGGLE_SEARCH } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
import Search from '@material-ui/icons/Search';
import { SearchBar } from '../../pages';
import { PADDING } from '../../shared';
import { getScheduledSiteConfig } from '../../../__configuration__/themes';

export type SharedToolbarProps = AppBarProps & {
    title?: string;
    color?: 'primary' | 'secondary' | 'default';
    subtitle?: string;
    navigationIcon?: JSX.Element;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuIconButton: {
            display: 'flex',
            alignItems: 'center',
            marginRight: theme.spacing(0.5),
        },
        toolbar: {
            display: 'flex',
            [theme.breakpoints.up('sm')]: {
                padding: `0 ${PADDING}px`,
            },
        },
    })
);

export const SharedToolbar = (props: SharedToolbarProps): JSX.Element => {
    const { title, color, subtitle, navigationIcon, ...other } = props;
    const classes = useStyles();
    const icon = navigationIcon ? navigationIcon : <PxblueSmall />;
    const history = useHistory();
    const theme = useTheme();
    const isLandingPage = history.location.pathname === '/';
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const sidebarOpen = useSelector((state: AppState) => state.app.sidebarOpen);
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const appBarBackground = getScheduledSiteConfig().appBarBackground;

    const _navigationIcon = useCallback(
        () => (
            <Hidden mdUp={navigationIcon !== undefined && !isLandingPage}>
                <IconButton
                    color={'inherit'}
                    onClick={(): void => {
                        dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                    }}
                    className={classes.menuIconButton}
                    edge={'start'}
                >
                    {icon}
                </IconButton>
            </Hidden>
        ),
        [navigationIcon]
    );

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
                style={{
                    zIndex: 1000,
                    width: `calc(100% - ${sidebarOpen ? (sm ? 0 : 350) : 0}px)`,
                    right: sidebarOpen ? (sm ? 0 : 350) : 0,
                    transition: `width ${theme.transitions.duration.standard} ${theme.transitions.easing.easeInOut}`,
                    ...appBarBackground,
                }}
                {...other}
            >
                <Toolbar className={classes.toolbar}>
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
