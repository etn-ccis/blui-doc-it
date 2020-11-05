import React, { ElementType, useState } from 'react';
import {
    AppBar,
    Button,
    Divider,
    Drawer as MuiDrawer,
    IconButton,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
    useTheme,
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
import {getKebabCase, getSnakeCase, unCamelCase} from '../../shared';

type DrawerProps = {
    icon: IconType;
    subtitle: string;
    drawerToggler: () => void;
    component: ElementType;
};

type Framework = 'angular' | 'react' | 'react-native';

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
        cursor: 'pointer',
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
        '&$expanded': {
            paddingLeft: 10,
        },
    },
    expanded: {},
})(MuiAccordionSummary);

// eslint-disable-next-line no-import-assign
const AccordionDetails = withStyles(() => ({
    root: {
        padding: '0 16px',
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'column',
    },
}))(MuiAccordionDetails);

export const IconDrawer = (props: DrawerProps): JSX.Element => {
    const { drawerToggler, icon, component: Component, subtitle } = props;
    const [reactIconFontToolTipOpen, setReactIconFontToolTipOpen] = useState(false);
    const [reactSvgToolTipOpen, setReactSvgToolTipOpen] = useState(false);
    const [reactComponentToolTipOpen, setReactComponentToolTipOpen] = useState(false);
    const [angularIconFontToolTipOpen, setAngularIconFontToolTipOpen] = useState(false);
    const [angularSvgToolTipOpen, setAngularSvgToolTipOpen] = useState(false);
    const [reactNativeSvgToolTipOpen, setReactNativeSvgToolTipOpen] = useState(false);

    const theme = useTheme();
    const isMaterial = props.icon.isMaterial;
    const classes = useStyles(theme);
    const [activeFramework, setActiveFramework] = useState<Framework | undefined>(undefined);

    const copyToClipboard = (e: any, text: string, toolTipFn: any): void => {
        e.stopPropagation();
        toolTipFn(true);
        setTimeout(() => {
            toolTipFn(false);
        }, 500);
        void navigator.clipboard.writeText(text);
    };

    const getReactIconFontCopy = (): string => {
        if (isMaterial) {
            return `import Icon from '@material-ui/core/Icon';\n<Icon>${getSnakeCase(icon.name)}</Icon>`;
        }
        return `<i className="pxb-${getSnakeCase(icon.name)}"></i>`;
    };
    const getReactIconFontExample = (): JSX.Element => (
        <>
            {isMaterial && (
                <>
                    {`import Icon from '@material-ui/core/Icon';`}
                    <br />
                    {`<Icon>${getSnakeCase(icon.name)}</Icon>`}
                </>
            )}
            {!isMaterial && `<i className="pxb-${getSnakeCase(icon.name)}"></i>`}
        </>
    );

    const getReactSvgCopy = (): string => {
        if (isMaterial) {
            return `import ${icon.name}Icon from '@material-ui/icons/${icon.name}';\n<${icon.name}Icon></${icon.name}Icon>`;
        }
        return `const icon = require('@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg');\n<img src={icon}/>`;
    };
    const getReactSvgExample = (): JSX.Element => (
        <>
            {isMaterial && (
                <>
                    {`import ${`${icon.name}Icon`} from '@material-ui/icons/${icon.name}';`}
                    <br />
                    {`<${`${icon.name}Icon`}></${`${icon.name}Icon`}>`}
                </>
            )}
            {!isMaterial && (
                <>
                    {`const icon = require('@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg');`}
                    <br />
                    {`<img src={icon}/>`}
                </>
            )}
        </>
    );

    const getReactComponentCopy = (): string =>
        `import ${icon.name}Icon from '@pxblue/icons-mui/${icon.name}';\n<${icon.name}Icon></${icon.name}Icon>`;
    const getReactComponentExample = (): JSX.Element => (
        <>
            {`import ${icon.name}Icon from '@pxblue/icons-mui/${icon.name}';`}
            <br />
            {`<${icon.name}Icon></${icon.name}Icon>`}
        </>
    );

    const getAngularIconFontCopy = (): string => {
        if (isMaterial) {
            return `<i class="${getSnakeCase(icon.name)}"></i>`;
        }
        return `<i class="pxb-${getSnakeCase(icon.name)}"></i>`;
    };
    const getAngularIconFontExample = (): JSX.Element => (
        <>
            {isMaterial && `<i class="${getSnakeCase(icon.name)}"></i>`}
            {!isMaterial && `<i class="pxb-${getSnakeCase(icon.name)}"></i>`}
        </>
    );

    const getAngularSvgCopy = (): string => {
        if (isMaterial) {
            return `<mat-icon>${getSnakeCase(icon.name)}</mat-icon>`;
        }
        return `<mat-icon svgIcon="${getSnakeCase(icon.name)}"></mat-icon>`;
    };
    const getAngularSvgExample = (): JSX.Element => (
        <>
            {isMaterial && `<mat-icon>${getSnakeCase(icon.name)}</mat-icon>`}
            {!isMaterial && `<mat-icon svgIcon="${getSnakeCase(icon.name)}"></mat-icon>`}
        </>
    );

    const getReactNativeSvgExample = (): JSX.Element => (
        <>
            {isMaterial && (
                <>
                    {`import Icon from 'react-native-vector-icons/MaterialIcons';`}
                    <br />
                    {`const myIcon = <Icon name="${getKebabCase(icon.name)}"/>;`}
                </>
            )}
            {!isMaterial && (
                <>
                    {`import ${icon.name} from '@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg';`}
                    <br />
                    {`const myIcon = <${icon.name} />`}
                </>
            )}
        </>
    );
    const getReactNativeSvgCopy = (): string => {
        if (isMaterial) {
            return `import Icon from 'react-native-vector-icons/MaterialIcons';\nconst myIcon = <Icon name="${getKebabCase(
                icon.name
            )}"/>;`;
        }
        return `import ${icon.name} from '@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg';\nconst myIcon = <${
            icon.name
        } />`;
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

    const openPanel = (framework: Framework): void =>
        framework === activeFramework ? setActiveFramework(undefined) : setActiveFramework(framework);

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
                    <Typography variant={'body1'}>{unCamelCase(icon.name)}</Typography>
                    <Typography variant={'body2'}>{subtitle}</Typography>
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
            <Accordion onClick={(): void => openPanel('react')} expanded={activeFramework === 'react'}>
                <AccordionSummary expandIcon={<ArrowDropDown />} IconButtonProps={{ disableRipple: true }}>
                    <Typography>React</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.codeSnippetTitle}>
                        <Typography variant={'overline'}>Icon Font</Typography>
                        <Tooltip title="Copied" placement="left" open={reactIconFontToolTipOpen}>
                            <FileCopy
                                className={classes.copyIcon}
                                onClick={(e): void => {
                                    copyToClipboard(e, getReactIconFontCopy(), setReactIconFontToolTipOpen);
                                }}
                            />
                        </Tooltip>
                    </div>
                    <pre className={classes.codeSnippet}>{getReactIconFontExample()}</pre>
                    <div className={classes.codeSnippetTitle}>
                        <Typography variant={'overline'}>SVG</Typography>
                        <Tooltip title="Copied" placement="left" open={reactSvgToolTipOpen}>
                            <FileCopy
                                className={classes.copyIcon}
                                onClick={(e): void => {
                                    copyToClipboard(e, getReactSvgCopy(), setReactSvgToolTipOpen);
                                }}
                            />
                        </Tooltip>
                    </div>
                    <pre className={classes.codeSnippet}>{getReactSvgExample()}</pre>
                    {!isMaterial && (
                        <>
                            <div className={classes.codeSnippetTitle}>
                                <Typography variant={'overline'}>Component</Typography>
                                <Tooltip title="Copied" placement="left" open={reactComponentToolTipOpen}>
                                    <FileCopy
                                        className={classes.copyIcon}
                                        onClick={(e): void => {
                                            copyToClipboard(e, getReactComponentCopy(), setReactComponentToolTipOpen);
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            <pre className={classes.codeSnippet}>{getReactComponentExample()}</pre>
                        </>
                    )}
                </AccordionDetails>
            </Accordion>
            <Accordion onClick={(): void => openPanel('angular')} expanded={activeFramework === 'angular'}>
                <AccordionSummary expandIcon={<ArrowDropDown />} IconButtonProps={{ disableRipple: true }}>
                    <Typography>Angular</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.codeSnippetTitle}>
                        <Typography variant={'overline'}>Icon Font</Typography>
                        <Tooltip title="Copied" placement="left" open={angularIconFontToolTipOpen}>
                            <FileCopy
                                className={classes.copyIcon}
                                onClick={(e): void => {
                                    copyToClipboard(e, getAngularIconFontCopy(), setAngularIconFontToolTipOpen);
                                }}
                            />
                        </Tooltip>
                    </div>
                    <pre className={classes.codeSnippet}>{getAngularIconFontExample()}</pre>
                    <div className={classes.codeSnippetTitle}>
                        <Typography variant={'overline'}>Svg</Typography>
                        <Tooltip title="Copied" placement="left" open={angularSvgToolTipOpen}>
                            <FileCopy
                                className={classes.copyIcon}
                                onClick={(e): void => {
                                    copyToClipboard(e, getAngularSvgCopy(), setAngularSvgToolTipOpen);
                                }}
                            />
                        </Tooltip>
                    </div>
                    <pre className={classes.codeSnippet}>{getAngularSvgExample()}</pre>
                </AccordionDetails>
            </Accordion>
            <Accordion onClick={(): void => openPanel('react-native')} expanded={activeFramework === 'react-native'}>
                <AccordionSummary expandIcon={<ArrowDropDown />}  IconButtonProps={{ disableRipple: true }}>
                    <Typography>React Native</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.codeSnippetTitle}>
                        <Typography variant={'overline'}>Svg</Typography>
                        <Tooltip title="Copied" placement="left" open={reactNativeSvgToolTipOpen}>
                            <FileCopy
                                className={classes.copyIcon}
                                onClick={(e): void => {
                                    copyToClipboard(e, getReactNativeSvgCopy(), setReactNativeSvgToolTipOpen);
                                }}
                            />
                        </Tooltip>
                    </div>
                    <pre className={classes.codeSnippet}>{getReactNativeSvgExample()}</pre>
                </AccordionDetails>
            </Accordion>
            <Divider />
            <div style={{ padding: 16 }}>
                <Typography variant={'subtitle2'}>
                    For detail usage and installation instructions, visit our{' '}
                    <a href={'https://github.com/pxblue/icons'}>Github</a>.
                </Typography>
            </div>
        </MuiDrawer>
    );
};
