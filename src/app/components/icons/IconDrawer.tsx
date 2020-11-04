import React, { ElementType, useRef } from 'react';
import {
    AppBar,
    Drawer as MuiDrawer,
    Theme,
    Toolbar,
    Typography,
    useTheme,
    IconButton,
    Divider,
    Button,
    withStyles,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as Colors from '@pxblue/colors';
import { ArrowDropDown, Close, FileCopy } from '@material-ui/icons';
import GetApp from '@material-ui/icons/GetApp';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

import { Spacer } from '@pxblue/react-components';
import { IconType } from '../../../__types__';
import { getSnakeCase } from '../../shared';

type DrawerProps = {
    icon: IconType;
    drawerToggler: () => void;
    component: ElementType;
};

const getMuiIconName = (filename: string): string =>
    filename.replace(/\.svg/, '').replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        maxWidth: '55%',
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
    codeSnippetTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    codeSnippet: {
        margin: `${theme.spacing(0.5)}px 0`,
        marginBottom: theme.spacing(2),
        whiteSpace: 'normal',
    },
    copyIcon: {
        fontSize: 16,
    },
}));

// eslint-disable-next-line
const Accordion = withStyles((theme: Theme) => {
    return {
        root: {
            boxShadow: 'none',
            transition: `border 0ms`,
            '&$expanded': {
                margin: 0,
                borderLeft: `solid 6px ${theme.palette.primary.main}`,
                borderTop: `solid 1px ${theme.palette.divider}`,
                borderBottom: `solid 1px ${theme.palette.divider}`,
            },
        },
        expanded: {},
    };
})(MuiAccordion);

// eslint-disable-next-line no-import-assign
const AccordionSummary = withStyles({
    root: {
        height: 48,
        minHeight: '48px!important',
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
})(MuiAccordionSummary);

// eslint-disable-next-line no-import-assign
const AccordionDetails = withStyles(() => ({
    root: {
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
    },
}))(MuiAccordionDetails);

export const IconDrawer = (props: DrawerProps): JSX.Element => {
    const { drawerToggler, icon, component: Component } = props;
    const theme = useTheme();
    const isMaterial = props.icon.isMaterial;
    const classes = useStyles(theme);
    const textAreaRef = useRef(null as any);

    const copyToClipboard = (e: any): void => {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
    };

    // Can be Material or PX Blue icons
    const downloadSvg = (): void => {
        if (icon.isMaterial) {
            window.open(
                `https://fonts.gstatic.com/s/i/materialicons/${getSnakeCase(icon.name)}/v6/24px.svg?download=true`
            );
        } else {
            window.open(`https://raw.githubusercontent.com/pxblue/icons/dev/svg/${icon.name}.svg`);
        }
    };

    // Material Icons only
    const downloadPng = (): void => {
        window.open(`//fonts.gstatic.com/s/i/materialicons/${getSnakeCase(icon.name)}/v6/black-18dp.zip?download=true`);
    };

    return (
        <MuiDrawer
            open={Boolean(icon.name)}
            onClose={drawerToggler}
            anchor={'right'}
            transitionDuration={250}
            ModalProps={{ hideBackdrop: false }}
            classes={{ paper: classes.drawer }}
        >
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
                {icon.name && Component && <Component style={{ fontSize: 36 }} />}
                <div className={classes.iconNameRowDescription}>
                    <Typography variant={'subtitle1'}>{icon.name}</Typography>
                    <Typography variant={'body1'}>Category (TODO)</Typography>
                </div>
            </div>
            <Divider />
            <div style={{ padding: theme.spacing(2) }}>
                <Typography variant={'subtitle1'} style={{ marginBottom: theme.spacing(1) }}>
                    Download
                </Typography>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: theme.spacing(1) }}
                        startIcon={<GetApp />}
                        onClick={downloadSvg}
                    >
                        SVG
                    </Button>
                    {isMaterial && (
                        <Button variant="contained" color="primary" onClick={downloadPng} startIcon={<GetApp />}>
                            PNG
                        </Button>
                    )}
                </div>
            </div>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDown />}>
                    <Typography>React</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography variant={'overline'} style={{ width: '100%' }}>
                            Icon Font
                        </Typography>
                    </div>
                    {!isMaterial && <pre className={classes.codeSnippet}>{`<i className="pxb-${icon.name}"></i>`}</pre>}
                    {isMaterial && (
                        <pre className={classes.codeSnippet}>
                            {`import Icon from '@material-ui/core/Icon';`}
                            <br />
                            {`<Icon>${getSnakeCase(name)}</Icon>`}
                        </pre>
                    )}
                    <div>
                        <div className={classes.codeSnippetTitle}>
                            <Typography variant={'overline'}>SVG</Typography>
                            <FileCopy onClick={copyToClipboard} className={classes.copyIcon} />
                        </div>
                        {!isMaterial && (
                            <pre className={classes.codeSnippet} ref={textAreaRef}>
                                {`const icon = require('@pxblue/icons-svg/${icon.name}.svg');`}
                                <br />
                                {`<img src={icon}/>`}
                            </pre>
                        )}
                        {isMaterial && (
                            <pre className={classes.codeSnippet}>
                                {`import ${`${icon.name}Icon`} from '@material-ui/icons/${icon.name}';`}
                                <br />
                                {`<${`${icon.name}Icon`}></${`${icon.name}Icon`}>`}
                            </pre>
                        )}
                    </div>
                    {!isMaterial && (
                        <div>
                            <Typography variant={'overline'} style={{ width: '100%' }}>
                                Component
                            </Typography>
                            <pre className={classes.codeSnippet}>
                                {`import ${getMuiIconName(icon.name)}Icon from '@pxblue/icons-mui/${getMuiIconName(
                                    icon.name
                                )}';`}
                                <br />
                                {`<${getMuiIconName(icon.name)}Icon></${getMuiIconName(icon.name)}Icon>`}
                            </pre>
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDown />}>
                    <Typography>Angular</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {!isMaterial && <pre>{`<i class="pxb-${icon.name}"></i>`}</pre>}
                    {isMaterial && <pre>{`<i class="${getSnakeCase(icon.name)}"></i>`}</pre>}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDown />}>
                    <Typography>React Native</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography color={'inherit'} variant="subtitle2">
                        For React Native applications, the preferred approach is to use SVG icons.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <div style={{ padding: 16 }}>
                <Typography variant={'subtitle2'}>
                    For detail usage and installation instructions, visit our Github.
                </Typography>
            </div>
        </MuiDrawer>
    );
};
