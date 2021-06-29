import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    AppBar,
    Button,
    Divider,
    Drawer as MuiDrawer,
    IconButton,
    Link,
    Theme,
    Toolbar,
    Typography,
    useTheme,
    makeStyles,
    useMediaQuery,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { EmptyState, Spacer } from '@pxblue/react-components';

import { GetApp, Close } from '@material-ui/icons';
import { Pxblue } from '@pxblue/icons-mui';

import { unCamelCase } from '../../shared';
import { emptyIcon } from '.';
import { downloadPng, downloadSvg } from './utilityFunctions';

import * as Colors from '@pxblue/colors';
import { DeveloperInstructionsPanel } from './DeveloperInstructions';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_SIDEBAR } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
import { CopyToClipboard } from './CopyToClipboardButton';
import { IconSize, IconColor } from '../../../__types__';
import { usePrevious } from '../../hooks/usePrevious';

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        maxWidth: '80%',
        width: 350,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 900,
    },
    appBar: {
        backgroundColor: Colors.black[500],
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(0.5),
    },
    appBarCloseButton: {
        color: Colors.white[50],
    },
    iconNameRow: {
        display: 'flex',
        padding: theme.spacing(2),
        alignItems: 'center',
    },
    iconNameRowDescription: {
        marginLeft: theme.spacing(3),
    },
    iconNameWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    formControl: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
        minWidth: 120,
    },
}));

export const IconDrawer: React.FC = () => {
    const { selectedIcon = emptyIcon } = useSelectedIcon();
    const previousSelectedIcon = usePrevious(selectedIcon);
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(theme);
    const [iconSize, setIconSize] = React.useState<IconSize>(24);
    const [iconColor, setIconColor] = React.useState<IconColor>('black');
    const drawerOpen = useSelector((state: AppState) => state.app.sidebarOpen);
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const closeDrawer = (): void => {
        history.replace(`${location.pathname}`);
        dispatch({ type: TOGGLE_SIDEBAR, payload: false });
    };

    useEffect(() => {
        if(previousSelectedIcon && previousSelectedIcon.isMaterial !== selectedIcon.isMaterial){
            setIconSize(24 as IconSize);
            setIconColor('black' as IconColor);
        }
    }, [selectedIcon]);

    return (
        <MuiDrawer
            anchor={'right'}
            variant={sm ? 'temporary' : 'persistent'}
            open={drawerOpen}
            onClose={closeDrawer}
            classes={{ paper: classes.drawer }}
        >
            <AppBar position="static" color="primary">
                <Toolbar className={classes.appBar}>
                    <Typography variant="h6" color="inherit" noWrap>
                        Selected Icon
                    </Typography>
                    <Spacer />
                    <IconButton onClick={closeDrawer} className={classes.appBarCloseButton}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ flex: '1 1 0px', overflowY: 'auto' }}>
                {selectedIcon.name === '' && (
                    <EmptyState
                        icon={<Pxblue fontSize={'inherit'} />}
                        title={'No Icon Selected'}
                        description={'Select a icon on the left to download or view usage details'}
                        style={{ padding: 24 }}
                    />
                )}
                {selectedIcon.name !== '' && (
                    <>
                        <div className={classes.iconNameRow}>
                            <selectedIcon.Icon style={{ fontSize: 40 }} />
                            <div className={classes.iconNameRowDescription}>
                                <div className={classes.iconNameWrapper}>
                                    <Typography variant={'body1'}>{unCamelCase(selectedIcon.name)}</Typography>
                                    <CopyToClipboard
                                        title={'Copy Icon Name'}
                                        copyText={unCamelCase(selectedIcon.name)}
                                        style={{ marginLeft: theme.spacing(1) }}
                                    />
                                </div>
                                <Typography variant={'caption'}>
                                    {selectedIcon.isMaterial ? 'Material Icon' : 'PX Blue Icon'}
                                </Typography>
                            </div>
                        </div>
                        <Divider />
                        {selectedIcon.tags.length > 0 && (
                            <>
                                <div style={{ padding: theme.spacing(2) }}>
                                    <Typography
                                        display={'block'}
                                        variant={'overline'}
                                        style={{ marginBottom: theme.spacing(1) }}
                                    >
                                        TAGS / KEYWORDS
                                    </Typography>
                                    <code style={{ display: 'block', whiteSpace: 'normal', padding: theme.spacing(1) }}>
                                        {selectedIcon.tags.join(', ')}
                                    </code>
                                </div>
                                <Divider />
                            </>
                        )}
                        <div style={{ padding: theme.spacing(2) }}>
                            <Typography
                                display={'block'}
                                variant={'overline'}
                                color={'primary'}
                                style={{ marginBottom: theme.spacing(1) }}
                            >
                                Download
                            </Typography>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="icon-size-select-label">
                                        Select a Size:
                                    </InputLabel>
                                    <Select
                                        labelId="icon-size-select-label"
                                        id="icon-size-select"
                                        value={iconSize}
                                        onChange={(e): void => setIconSize(e.target.value as IconSize)}
                                    >
                                        {selectedIcon.isMaterial && <MenuItem value={18}>18dp</MenuItem>}
                                        <MenuItem value={24}>24dp</MenuItem>
                                        {selectedIcon.isMaterial && <MenuItem value={36}>36dp</MenuItem>}
                                        <MenuItem value={48}>48dp</MenuItem>
                                    </Select>

                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="icon-color-select-label">Select a Color:</InputLabel>
                                    <Select
                                        labelId="icon-color-select-label"
                                        id="icon-color-select"
                                        value={iconColor}
                                        onChange={(e): void => setIconColor(e.target.value as IconColor)}
                                    >

                                        <MenuItem value={'black'}>Black</MenuItem>
                                        <MenuItem value={'white'}>White</MenuItem>
                                        {!selectedIcon.isMaterial && <MenuItem value={'blue'}>Blue</MenuItem>}
                                        {!selectedIcon.isMaterial && <MenuItem value={'gray'}>Gray</MenuItem>}

                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginRight: theme.spacing(1) }}
                                    startIcon={<GetApp />}
                                    onClick={(): void => {
                                        void downloadSvg(selectedIcon, iconColor, iconSize);
                                    }}
                                >
                                    SVG
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(): void => downloadPng(selectedIcon, iconColor, iconSize)}
                                    startIcon={<GetApp />}
                                >
                                    PNG
                                </Button>
                            </div>
                        </div>
                        <Divider />

                        <DeveloperInstructionsPanel />

                        <div style={{ padding: 16 }}>
                            <Typography variant={'subtitle2'} align={'center'}>
                                For detailed usage and installation instructions, visit our{' '}
                                <Link href={'https://github.com/pxblue/icons'} target={'_blank'}>
                                    Github
                                </Link>
                                .
                            </Typography>
                        </div>
                    </>
                )}
            </div>
        </MuiDrawer>
    );
};
