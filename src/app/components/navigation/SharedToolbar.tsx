import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { PxblueSmall } from '@brightlayer-ui/icons-mui';
import { Spacer } from '@brightlayer-ui/react-components';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch, changeTheme, toggleDrawer, toggleSearch, RootState } from '../../redux';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import { SearchBar } from '../../pages';
import { getScheduledSiteConfig } from '../../../__configuration__/themes';
import externalLinks from '../../../__configuration__/landingPage/externalLinks';
import { ExternalLinkItem } from './ListOfExternalLinks';
import FireworksCanvas from 'fireworks-canvas';

export type SharedToolbarProps = AppBarProps & {
    title?: string;
    color?: 'primary' | 'secondary' | 'default';
    subtitle?: string;
    navigationIcon?: JSX.Element;
};

const availableThemes = [
    'thanksgiving',
    'womens-day',
    'diwali',
    'christmas',
    'halloween',
    'april-fools',
    'may-fourth',
    'hanukkah',
    'kwanzaa',
    'new-years',
    'spring-festival',
    'st-patricks',
    'earth-day',
    'independence-day',
    'mid-autumn-festival',
    'valentines-day',
    'dark',
    'blue',
    'default',
];

export const SharedToolbar = (props: SharedToolbarProps): JSX.Element => {
    const { title, color, subtitle, navigationIcon, onClick, ...other } = props;
    const icon = navigationIcon ?? <PxblueSmall />;
    const location = useLocation();
    const theme = useTheme();
    const isLandingPage = location.pathname === '/';
    const [showThemePicker, setShowThemePicker] = useState(false);
    const drawerOpen = useAppSelector((state: RootState) => state.app.drawerOpen);
    const sidebarOpen = useAppSelector((state: RootState) => state.app.sidebarOpen);
    const showBanner = useAppSelector((state: RootState) => state.app.showBanner);
    const selectedTheme = useAppSelector((state: RootState) => state.app.theme);
    const [externalLinkMenuAnchorEl, setExternalLinkMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const isExternalLinkMenuOpen = Boolean(externalLinkMenuAnchorEl);
    const sm = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useAppDispatch();
    const appBarBackground = getScheduledSiteConfig(selectedTheme).appBarBackground;
    const getIsFireworkHoliday = (): boolean => {
        const holidayClassName = getScheduledSiteConfig(selectedTheme).className ?? '';
        const fireworkHolidays = ['independence-day'];

        if (fireworkHolidays.includes(holidayClassName)) {
            return true;
        }
        return false;
    };

    const getNavigationIcon = useCallback(
        () => (
            <Box
            sx={{
                display: {
                    xs: 'block',
                    sm: 'block',
                    md: navigationIcon !== undefined && !isLandingPage ? 'none' : 'block'
                }
            }}
       >
                <IconButton
                    color={'inherit'}
                    size={'large'}
                    edge={'start'}
                    sx={{ mr: 0.5 }}
                    onClick={(): void => {
                        dispatch(toggleDrawer(!drawerOpen));
                    }}
                >
                    {icon}
                </IconButton>
         </Box>
        ),
        [navigationIcon]
    );

    useEffect(() => {
        if (getIsFireworkHoliday()) {
            const fireworksContainer: HTMLElement =
                document.getElementById('fireworks') ?? document.createElement('div');
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

    const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            onClick?.(e);
            if (e.detail === 3) {
                // DEBUG MODE: CHOOSE A THEME
                setShowThemePicker(true);
            }
        },
        [onClick]
    );

    return (
        <>
            <AppBar
                position="sticky"
                color={color}
                elevation={0}
                sx={{
                    zIndex: 'drawer',
                    width: `calc(100% - ${sidebarOpen ? (sm ? 0 : 350) : 0}px)`,
                    right: sidebarOpen ? (sm ? 0 : 350) : 0,
                    transition: `width ${theme.transitions.duration.standard} ${theme.transitions.easing.easeInOut}`,
                    top: showBanner ? theme.spacing(sm ? 7 : 8) : 0,
                    ...appBarBackground,
                }}
                onClick={handleClick}
                {...other}
            >
                {getIsFireworkHoliday() && (
                    <Box
                        id="fireworks"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: 'hidden',
                        }}
                    />
                )}
                <Toolbar>
                    {getNavigationIcon()}
                    {props.title ? (
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography variant={'h6'} sx={{ fontWeight: 600, lineHeight: 1 }}>
                                    {title}
                                </Typography>
                            }
                            secondary={<Typography variant={'subtitle1'}>{subtitle}</Typography>}
                        />
                    ) : (
                        <Typography>
                            Brightlayer <b>User Interface</b>
                        </Typography>
                    )}
                    <Spacer />
                    <IconButton
                        color={'inherit'}
                        size={'large'}
                        onClick={(e): void => {
                            setExternalLinkMenuAnchorEl(e.currentTarget);
                        }}
                    >
                        <AppsIcon />
                    </IconButton>
                    <IconButton
                        color={'inherit'}
                        size={'large'}
                        edge={'end'}
                        onClick={(): void => {
                            dispatch(toggleSearch(true));
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SearchBar />
            {/* Convenient links to other design systems at Eaton*/}
            <Menu
                open={isExternalLinkMenuOpen}
                anchorEl={externalLinkMenuAnchorEl}
                onClose={(): void => {
                    setExternalLinkMenuAnchorEl(null);
                }}
            >
                {externalLinks.map((externalLink, index) => (
                    <ExternalLinkItem externalLink={externalLink} key={index} />
                ))}
            </Menu>
            {/* Theme toggler */}
            <Dialog
                open={showThemePicker}
                onClose={(): void => {
                    setShowThemePicker(false);
                }}
            >
                <DialogTitle>Choose Theme</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        select
                        margin="dense"
                        label="Theme"
                        fullWidth
                        variant="outlined"
                        value={selectedTheme}
                        onChange={(e): void => {
                            dispatch(changeTheme(e.target.value));
                        }}
                    >
                        {availableThemes.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(): void => {
                            setShowThemePicker(false);
                        }}
                    >
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
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
