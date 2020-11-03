import React, {ElementType} from 'react';
import {
    AppBar,
    Drawer as MuiDrawer,
    Theme,
    Toolbar,
    Typography,
    useTheme,
    IconButton,
    Divider
} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import * as Colors from '@pxblue/colors';
import {Close} from "@material-ui/icons";
import {Spacer} from "@pxblue/react-components";
import {Icon} from "../../../__types__";

type DrawerProps = {
    icon: Icon;
    drawerToggler: () => void;
    component: ElementType;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        maxWidth: '55%',
        width: 350,
    },
    appBar: {
        backgroundColor: Colors.black[500],
        paddingLeft: 16,
        paddingRight: 4
    },
    appBarCloseButton: {
        color: Colors.white[50],
    },
    iconNameRow: {
        display: 'flex',
        padding: 16,
        alignItems: 'center'
    },
    iconNameRowDescription: {
        marginLeft: 24
    }
}));

export const IconDrawer = (props: DrawerProps): JSX.Element => {
    const { drawerToggler, icon, component: Component } = props;
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <MuiDrawer open={Boolean(icon.name)} onClose={drawerToggler}
                   anchor={'right'} transitionDuration={250}
                   ModalProps={{hideBackdrop: false}}
                   classes={{ paper: classes.drawer }}>
            <AppBar position="static" color="primary">
                <Toolbar className={classes.appBar}>
                    <Typography variant="h6" color="inherit" noWrap>
                        Selected Icon
                    </Typography>
                    <Spacer />
                    <IconButton onClick={drawerToggler} className={classes.appBarCloseButton}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.iconNameRow}>
                {icon.name && <Component style={{ fontSize: 36 }} />}
                <div className={classes.iconNameRowDescription}>
                    <Typography variant={'subtitle1'}>{icon.name}</Typography>
                    <Typography variant={'body1'}>Category (TODO)</Typography>
                </div>
            </div>
            <Divider />
            <Typography variant={'h6'}>Download</Typography>
        </MuiDrawer>

    )
};
