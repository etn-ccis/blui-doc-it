/*eslint-disable */
import React, { useState } from 'react';
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
    Tooltip,
    Typography,
    useTheme,
    withStyles,
    makeStyles,
    Accordion as MuiAccordion,
    AccordionSummary as MuiAccordionSummary,
    AccordionDetails as MuiAccordionDetails,
} from '@material-ui/core';
import { EmptyState, Spacer } from '@pxblue/react-components';

import * as AllMaterialIcons from '@material-ui/icons';
import * as MuiIcons from '@pxblue/icons-mui';

import { getKebabCase, getSnakeCase, unCamelCase } from '../../shared';
import { emptyIcon } from './IconBrowser';
import { SELECT_ICON } from '../../redux/actions';
import { downloadPng, downloadSvg } from './utilityFunctions';

import * as Colors from '@pxblue/colors';

type DrawerProps = {
    subtitle: string;
};

type Framework = 'angular' | 'react' | 'react-native';
type IconInstruction =
    | 'react-component'
    | 'angular-svg'
    | 'react-svg'
    | 'react-native-svg'
    | 'angular-font'
    | 'react-font'
    | undefined;

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: 350,
    },
    drawerRoot: {
        // position: 'unset'
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
        color: Colors.gray[500],
        fontSize: 16,
        cursor: 'pointer',
    },
    expandIcon: {
        color: Colors.gray[500],
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
    const { subtitle } = props;
    // const [reactIconFontToolTipOpen, setReactIconFontToolTipOpen] = useState(false);
    // const [reactSvgToolTipOpen, setReactSvgToolTipOpen] = useState(false);
    // const [reactComponentToolTipOpen, setReactComponentToolTipOpen] = useState(false);
    // const [angularIconFontToolTipOpen, setAngularIconFontToolTipOpen] = useState(false);
    // const [angularSvgToolTipOpen, setAngularSvgToolTipOpen] = useState(false);
    // const [reactNativeSvgToolTipOpen, setReactNativeSvgToolTipOpen] = useState(false);
    const [copiedInstructions, setCopiedInstructions] = useState<IconInstruction>(undefined);

    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    const icon: IconType = useSelector((state: AppState) => state.app.selectedIcon) || emptyIcon;
    const isMaterial = icon.isMaterial;
    const classes = useStyles(theme);
    const [activeFramework, setActiveFramework] = useState<Framework | undefined>(undefined);

    const copyToClipboard = (e: any, text: string, instruction: IconInstruction): void => {
        e.stopPropagation();
        setCopiedInstructions(instruction);
        setTimeout(() => {
            setCopiedInstructions(undefined);
        }, 1000);
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

    const openPanel = (framework: Framework): void =>
        framework === activeFramework ? setActiveFramework(undefined) : setActiveFramework(framework);

    const closeDrawer = (): void => {
        // history.replace(`${location.pathname}`);
        dispatch({ type: SELECT_ICON, payload: emptyIcon });
    };

    const PXBlueIcons: MatIconList = MuiIcons;
    const MaterialIcons: MatIconList = AllMaterialIcons;
    // @ts-ignore
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
                                onClick={() => downloadSvg(icon)}
                            >
                                SVG
                            </Button>
                            {isMaterial && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => downloadPng(icon)}
                                    startIcon={<AllMaterialIcons.GetApp />}
                                >
                                    PNG
                                </Button>
                            )}
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <Typography display={'block'} variant={'overline'} style={{ padding: theme.spacing(2) }}>
                            Developer Usage
                        </Typography>
                        <Accordion
                            expanded={activeFramework === 'react'}
                            onChange={() => setActiveFramework(activeFramework === 'react' ? undefined : 'react')}
                        >
                            <AccordionSummary
                                expandIcon={<AllMaterialIcons.ArrowDropDown className={classes.expandIcon} />}
                                IconButtonProps={{ disableRipple: true }}
                            >
                                <Typography variant={activeFramework === 'react' ? 'subtitle2' : 'body2'}>
                                    React
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.codeSnippetTitle}>
                                    <Typography variant={'overline'}>Icon Font</Typography>
                                    <Tooltip title="Copied" placement="left" open={copiedInstructions === 'react-font'}>
                                        <AllMaterialIcons.FileCopy
                                            className={classes.copyIcon}
                                            onClick={(e): void => {
                                                copyToClipboard(e, getReactIconFontCopy(), 'react-font');
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                                <pre className={classes.codeSnippet}>{getReactIconFontExample()}</pre>
                                <div className={classes.codeSnippetTitle}>
                                    <Typography variant={'overline'}>SVG</Typography>
                                    <Tooltip title="Copied" placement="left" open={copiedInstructions === 'react-svg'}>
                                        <AllMaterialIcons.FileCopy
                                            className={classes.copyIcon}
                                            onClick={(e): void => {
                                                copyToClipboard(e, getReactSvgCopy(), 'react-svg');
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                                <pre className={classes.codeSnippet}>{getReactSvgExample()}</pre>
                                {!isMaterial && (
                                    <>
                                        <div className={classes.codeSnippetTitle}>
                                            <Typography variant={'overline'}>Component</Typography>
                                            <Tooltip
                                                title="Copied"
                                                placement="left"
                                                open={copiedInstructions === 'react-component'}
                                            >
                                                <AllMaterialIcons.FileCopy
                                                    className={classes.copyIcon}
                                                    onClick={(e): void => {
                                                        copyToClipboard(e, getReactComponentCopy(), 'react-component');
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                        <pre className={classes.codeSnippet}>{getReactComponentExample()}</pre>
                                    </>
                                )}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            expanded={activeFramework === 'angular'}
                            onChange={() => setActiveFramework(activeFramework === 'angular' ? undefined : 'angular')}
                        >
                            <AccordionSummary
                                expandIcon={<AllMaterialIcons.ArrowDropDown className={classes.expandIcon} />}
                                IconButtonProps={{ disableRipple: true }}
                            >
                                <Typography variant={activeFramework === 'angular' ? 'subtitle2' : 'body2'}>
                                    Angular
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.codeSnippetTitle}>
                                    <Typography variant={'overline'}>Icon Font</Typography>
                                    <Tooltip
                                        title="Copied"
                                        placement="left"
                                        open={copiedInstructions === 'angular-font'}
                                    >
                                        <AllMaterialIcons.FileCopy
                                            className={classes.copyIcon}
                                            onClick={(e): void => {
                                                copyToClipboard(e, getAngularIconFontCopy(), 'angular-font');
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                                <pre className={classes.codeSnippet}>{getAngularIconFontExample()}</pre>
                                <div className={classes.codeSnippetTitle}>
                                    <Typography variant={'overline'}>Svg</Typography>
                                    <Tooltip
                                        title="Copied"
                                        placement="left"
                                        open={copiedInstructions === 'angular-svg'}
                                    >
                                        <AllMaterialIcons.FileCopy
                                            className={classes.copyIcon}
                                            onClick={(e): void => {
                                                copyToClipboard(e, getAngularSvgCopy(), 'angular-svg');
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                                <pre className={classes.codeSnippet}>{getAngularSvgExample()}</pre>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            expanded={activeFramework === 'react-native'}
                            onChange={() =>
                                setActiveFramework(activeFramework === 'react-native' ? undefined : 'react-native')
                            }
                        >
                            <AccordionSummary
                                expandIcon={<AllMaterialIcons.ArrowDropDown className={classes.expandIcon} />}
                                IconButtonProps={{ disableRipple: true }}
                            >
                                <Typography variant={activeFramework === 'react-native' ? 'subtitle2' : 'body2'}>
                                    React Native
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.codeSnippetTitle}>
                                    <Typography variant={'overline'}>Svg</Typography>
                                    <Tooltip
                                        title="Copied"
                                        placement="left"
                                        open={copiedInstructions === 'react-native-svg'}
                                    >
                                        <AllMaterialIcons.FileCopy
                                            className={classes.copyIcon}
                                            onClick={(e): void => {
                                                copyToClipboard(e, getReactNativeSvgCopy(), 'react-native-svg');
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                                <pre className={classes.codeSnippet}>{getReactNativeSvgExample()}</pre>
                            </AccordionDetails>
                        </Accordion>
                    </div>
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
