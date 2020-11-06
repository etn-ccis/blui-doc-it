import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { useHistory } from 'react-router-dom';
import { IconType, MatIconList } from '../../../__types__';
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

import * as AllMaterialIcons from '@material-ui/icons';
import * as MuiIcons from '@pxblue/icons-mui';

import { unCamelCase } from '../../shared';
import { emptyIcon } from './IconBrowser';
import { SELECT_ICON } from '../../redux/actions';
import { downloadPng, downloadSvg } from './utilityFunctions';

import * as Colors from '@pxblue/colors';
import { DeveloperInstructionsPanel } from './DeveloperInstructions';

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: 350,
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

export const IconDrawer = (): JSX.Element => {
    const theme = useTheme();
    // eslint-disable-next-line
    const history = useHistory();
    const dispatch = useDispatch();
    const icon: IconType = useSelector((state: AppState) => state.app.selectedIcon) || emptyIcon;
    const isMaterial = icon.isMaterial;
    const classes = useStyles(theme);

    const closeDrawer = (): void => {
        // history.replace(`${location.pathname}`);
        dispatch({ type: SELECT_ICON, payload: emptyIcon });
    };

    const PXBlueIcons: MatIconList = MuiIcons;
    const MaterialIcons: MatIconList = AllMaterialIcons;
    const IconComponent = icon.isMaterial ? MaterialIcons[icon.name] : PXBlueIcons[icon.name];

    return (
        <MuiDrawer
            anchor={'right'}
            variant={'permanent'}
            open={Boolean(icon.name)}
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
                        <AllMaterialIcons.Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {icon.name === '' && (
                <EmptyState
                    icon={<MuiIcons.Pxblue fontSize={'inherit'} />}
                    title={'No Icon Selected'}
                    description={'Select a icon on the left to download or view usage details'}
                    style={{ padding: 24 }}
                />
            )}
            {icon.name !== '' && (
                <>
                    <div className={classes.iconNameRow}>
                        <IconComponent />
                        <div className={classes.iconNameRowDescription}>
                            <Typography variant={'body1'}>{unCamelCase(icon.name)}</Typography>
                            <Typography variant={'caption'}>{isMaterial ? 'Material Icon' : 'PX Blue Icon'}</Typography>
                        </div>
                    </div>
                    <Divider />
                    <div style={{ padding: theme.spacing(2) }}>
                        <Typography display={'block'} variant={'overline'} style={{ marginBottom: theme.spacing(1) }}>
                            TAGS / KEYWORDS
                        </Typography>
                        <code style={{ display: 'block', whiteSpace: 'normal', padding: theme.spacing(1) }}>
                            {icon.tags.join(', ')}
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
                                startIcon={<AllMaterialIcons.GetApp />}
                                onClick={(): void => downloadSvg(icon)}
                            >
                                SVG
                            </Button>
                            {isMaterial && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(): void => downloadPng(icon)}
                                    startIcon={<AllMaterialIcons.GetApp />}
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
        </MuiDrawer>
    );
};
