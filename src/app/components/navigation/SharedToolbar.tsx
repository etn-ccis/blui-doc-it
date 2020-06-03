import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    AppBar,
    Toolbar,
    ListItemText,
    AppBarProps,
    Hidden,
    // useMediaQuery,
    IconButton,
    makeStyles,
    Theme,
    createStyles,
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
            marginLeft: theme.spacing(-1.5),
        },
        searchIconButton: { marginRight: theme.spacing(-1.5) },
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
    // const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
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
                    className={classes.menuIconButton}
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
            <AppBar position="sticky" color={color} elevation={0} style={{ zIndex: 1000 }} {...other}>
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
                        className={classes.searchIconButton}
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
