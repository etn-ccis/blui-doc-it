import React from 'react';
// import { useDispatch } from 'react-redux';
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
} from '@material-ui/core';
import { EmptyState, Spacer } from '@pxblue/react-components';

import { GetApp, Close } from '@material-ui/icons';
import { Pxblue } from '@pxblue/icons-mui';

import { unCamelCase } from '../../shared';
import { emptyIcon } from '.';
import { downloadPng, downloadSvg } from './utilityFunctions';

import * as Colors from '@pxblue/colors';
import { DeveloperInstructionsPanel } from './DeveloperInstructions';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: 350,
        display: 'flex',
        flexDirection: 'column',
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
}));

export const IconDrawer: React.FC = () => {
    const { selectedIcon = emptyIcon } = useSelectedIcon();
    const theme = useTheme();
    // eslint-disable-next-line
    const history = useHistory();
    // const dispatch = useDispatch();
    const classes = useStyles(theme);

    const closeDrawer = (): void => {
        // history.replace(`${location.pathname}`);
        // dispatch({ type: SELECT_ICON, payload: emptyIcon });
    };

    return (
        <MuiDrawer
            anchor={'right'}
            variant={'permanent'}
            open={Boolean(selectedIcon)}
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
                            <selectedIcon.Icon />
                            <div className={classes.iconNameRowDescription}>
                                <Typography variant={'body1'}>{unCamelCase(selectedIcon.name)}</Typography>
                                <Typography variant={'caption'}>
                                    {selectedIcon.isMaterial ? 'Material Icon' : 'PX Blue Icon'}
                                </Typography>
                            </div>
                        </div>
                        <Divider />
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginRight: theme.spacing(1) }}
                                    startIcon={<GetApp />}
                                    onClick={(): void => downloadSvg(selectedIcon)}
                                >
                                    SVG
                                </Button>
                                {!selectedIcon.isMaterial && (
                                    <Typography
                                        display={'block'}
                                        variant={'caption'}
                                        style={{ marginTop: theme.spacing(0.5) }}
                                    >
                                        Icon file will open in a new window — right click it and Save As to download.
                                    </Typography>
                                )}
                                {selectedIcon.isMaterial && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(): void => downloadPng(selectedIcon)}
                                        startIcon={<GetApp />}
                                    >
                                        PNG
                                    </Button>
                                )}
                            </div>
                        </div>
                        <Divider />

                        <DeveloperInstructionsPanel />
                        <Divider />

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
