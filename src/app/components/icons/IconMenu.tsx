import React, { useState, useCallback, ChangeEvent } from 'react';
import * as AllMaterialIcons from '@material-ui/icons';
import clsx from 'clsx';

// PX Blue Icons and Symbols
import * as MuiIcons from '@pxblue/icons-mui';
import meta from '@pxblue/icons-mui/index.json';

// Material-UI Components
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
    Tabs,
    Tab,
    Typography,
    AccordionSummary,
    Accordion,
    AccordionActions,
    Button,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import { ExternalLink } from '../../../__configuration__/markdown/markdownMapping';
import { unCamelCase, getSnakeCase, getKebabCase } from '../../shared/utilities';
import { IconCard } from './IconCard';
import { IconType, MatIconList, DetailedIcon } from '../../../__types__';
import { getScheduledSiteConfig } from '../../../__configuration__/themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        usageBox: {
            padding: `10px ${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(2)}px`,
            overflowX: 'auto',
            height: '250px',
            overflowY: 'auto',
        },
        iconSheet: {
            width: '100%',
            maxHeight: `calc(100% - 64px)`,
            overflowY: 'auto',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
            position: 'fixed',
            marginLeft: 'auto',
            marginRight: 'auto',
            outline: 'none',
            boxShadow: theme.shadows[4],
            [theme.breakpoints.up('md')]: {
                left: 270,
                width: '600px',
            },
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
        aboutPage: {
            padding: theme.spacing(0.5),
            whiteSpace: 'pre-wrap',
        },
        miniTab: {
            minWidth: '50px',
        },
    })
);

const instructionLinks = {
    iconFont: 'https://www.npmjs.com/package/@pxblue/icons#using-the-icon-font-in-your-application',
    iconsSvg: 'https://www.npmjs.com/package/@pxblue/icons-svg',
    iconsMui: 'https://www.npmjs.com/package/@pxblue/icons-mui',
    reactSvg: 'https://material-ui.com/components/icons/#svg-icons',
    reactFont: 'https://material-ui.com/components/icons/#font-icons',
    angularFont: 'https://material.angular.io/components/icon/overview#font-icons-with-ligatures',
    angularSvg: 'https://material.angular.io/components/icon/overview#svg-icons',
};

const getIconFile = (iconName: string): DetailedIcon | -1 => {
    for (let i = 0; i < meta.icons.length; i++) {
        if (meta.icons[i].filename.includes(iconName)) {
            return meta.icons[i] as DetailedIcon;
        }
    }
    return -1;
};

const getMuiIconName = (filename: string): string =>
    filename.replace(/\.svg/, '').replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());

type IconMenuProps = {
    onClose: Function;
    open: boolean;
    icon: IconType;
};

export const IconMenu: React.FC<IconMenuProps> = (props): JSX.Element => {
    const [activeTab, setActiveTab] = useState(0);
    const MaterialIcons: MatIconList = AllMaterialIcons;
    const Icons: MatIconList = MuiIcons;
    const isMaterial = props.icon.isMaterial;
    const name = props.icon.name;
    const classes = useStyles(props);
    const { open } = props;
    const iconData = getIconFile(name);
    const themedClassName = getScheduledSiteConfig().className;

    const getTabContent = useCallback(
        (tab: number): JSX.Element | null => {
            switch (tab) {
                case 0:
                    return (
                        <>
                            {isMaterial && (
                                <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                    View detailed usage and installation instructions for{' '}
                                    <ExternalLink href={instructionLinks.reactFont}>React</ExternalLink> and{' '}
                                    <ExternalLink href={instructionLinks.angularFont}>Angular</ExternalLink>.
                                </Typography>
                            )}
                            {!isMaterial && (
                                <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                    For detailed usage and installation instructions, refer to the{' '}
                                    <ExternalLink href={instructionLinks.iconFont}>NPM page</ExternalLink>.
                                </Typography>
                            )}
                            <Typography color={'inherit'} variant="subtitle2">
                                React
                            </Typography>
                            {!isMaterial && <pre>{`<i className="pxb-${name}"></i>`}</pre>}
                            {isMaterial && (
                                <pre>
                                    {`import Icon from '@material-ui/core/Icon';`}
                                    <br />
                                    {`<Icon>${getSnakeCase(name)}</Icon>`}
                                </pre>
                            )}
                            <Typography color={'inherit'} variant="subtitle2">
                                Angular
                            </Typography>
                            {!isMaterial && <pre>{`<i class="pxb-${name}"></i>`}</pre>}
                            {isMaterial && <pre>{`<i class="${getSnakeCase(name)}"></i>`}</pre>}

                            <Typography color={'inherit'} variant="subtitle2">
                                React Native
                            </Typography>
                            <Typography color={'inherit'} variant="subtitle2">
                                For React Native applications, the preferred approach is to use SVG icons.
                            </Typography>
                        </>
                    );
                case 1:
                    return (
                        <>
                            {isMaterial && (
                                <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                    View detailed usage and installation instructions for{' '}
                                    <ExternalLink href={instructionLinks.reactSvg}>React</ExternalLink> and{' '}
                                    <ExternalLink href={instructionLinks.angularSvg}>Angular</ExternalLink>.
                                </Typography>
                            )}
                            {!isMaterial && (
                                <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                    For detailed usage and installation instructions, refer to the{' '}
                                    <ExternalLink href={instructionLinks.iconsSvg}>NPM page</ExternalLink>.
                                </Typography>
                            )}
                            <Typography color={'inherit'} variant="subtitle2">
                                React
                            </Typography>
                            {!isMaterial && (
                                <pre>
                                    {`const icon = require('@pxblue/icons-svg/${name}.svg');`}
                                    <br />
                                    {`<img src={icon}/>`}
                                </pre>
                            )}
                            {isMaterial && (
                                <pre>
                                    {`import ${`${name}Icon`} from '@material-ui/icons/${name}';`}
                                    <br />
                                    {`<${`${name}Icon`}></${`${name}Icon`}>`}
                                </pre>
                            )}
                            <Typography color={'inherit'} variant="subtitle2">
                                Angular
                            </Typography>
                            {!isMaterial && <pre>{`<mat-icon svgIcon="${name}"></mat-icon>`}</pre>}
                            {isMaterial && <pre>{`<mat-icon>${getSnakeCase(name)}</mat-icon>`}</pre>}

                            <Typography color={'inherit'} variant="subtitle2">
                                React Native
                            </Typography>
                            {!isMaterial && (
                                <pre>
                                    {`import ${getMuiIconName(name)} from '@pxblue/icons-svg/${name}.svg';`}
                                    <br />
                                    {`const myIcon = <${getMuiIconName(name)} />`}
                                </pre>
                            )}
                            {isMaterial && (
                                <pre>
                                    {`import Icon from 'react-native-vector-icons/MaterialIcons';`}
                                    <br />
                                    {`const myIcon = <Icon name="${getKebabCase(name)}"/>;`}
                                </pre>
                            )}
                        </>
                    );
                case 2:
                    return (
                        <>
                            {!isMaterial && (
                                <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                    For detailed usage and installation instructions, refer to the{' '}
                                    <ExternalLink href={instructionLinks.iconsMui}>NPM page</ExternalLink>.
                                </Typography>
                            )}
                            <Typography color={'inherit'} variant="subtitle2">
                                React
                            </Typography>
                            <pre>
                                {`import ${getMuiIconName(name)}Icon from '@pxblue/icons-mui/${getMuiIconName(name)}';`}
                                <br />
                                {`<${getMuiIconName(name)}Icon></${getMuiIconName(name)}Icon>`}
                            </pre>
                            <Typography color={'inherit'} variant="subtitle2">
                                Angular / React Native
                            </Typography>
                            <Typography color={'inherit'} variant="subtitle2">
                                Icon components are intended for use only in React (web) applications.
                            </Typography>
                        </>
                    );

                case 3:
                    return (
                        <>
                            {!isMaterial && iconData !== -1 && (
                                <div className={classes.aboutPage}>
                                    <Typography color={'inherit'} variant="subtitle1">
                                        <b>Filename</b>: {iconData.filename}
                                    </Typography>
                                    <Typography color={'inherit'} variant="subtitle1">
                                        <b>Family</b>: {iconData.family.join(', ')}
                                    </Typography>
                                    <Typography color={'inherit'} variant="subtitle1">
                                        <b>Author</b>: {iconData.author}
                                    </Typography>
                                    {iconData.description && (
                                        <Typography color={'inherit'} variant="subtitle1">
                                            <b>Description</b>: {iconData.description}
                                        </Typography>
                                    )}
                                </div>
                            )}
                        </>
                    );

                default:
                    return null;
            }
        },
        [iconData, name]
    );

    return (
        <div className={classes.iconSheet} hidden={!open}>
            <Accordion square defaultExpanded={true} elevation={16}>
                <AccordionSummary expandIcon={<ExpandLessIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <div style={{ flex: '0 1 auto', width: 'auto' }}>
                            <IconCard
                                key={name}
                                component={isMaterial ? MaterialIcons[name] : Icons[getMuiIconName(name)]}
                                name={name}
                                showLabel={false}
                                iconSize={40}
                                style={{ margin: '5 5px 5px 5px' }}
                            />
                        </div>
                        <div style={{ flexDirection: 'column', flex: '0 1 auto' }}>
                            <Typography
                                style={{ marginBottom: '0px', marginLeft: '10px', flex: '0 0 auto' }}
                                variant="subtitle2"
                                gutterBottom
                            >
                                {unCamelCase(getMuiIconName(name))}
                            </Typography>
                            <Typography
                                style={{ marginTop: '0px', marginLeft: '10px', flex: '0 0 auto' }}
                                variant="caption"
                                color={isMaterial ? 'inherit' : 'primary'}
                            >
                                {isMaterial ? 'Material Icon' : 'PX Blue Icon'}
                            </Typography>
                        </div>
                    </div>
                </AccordionSummary>
                <div style={{ width: 'auto' }}>
                    <Tabs
                        style={{ marginTop: '0px', marginLeft: '0px' }}
                        value={activeTab}
                        onChange={(event: ChangeEvent<{}>, newTab: number): void => {
                            setActiveTab(newTab);
                        }}
                        indicatorColor={'primary'}
                        textColor={'primary'}
                    >
                        <Tab label="Icon Font" className={classes.miniTab} />
                        <Tab label="SVG" className={classes.miniTab} />
                        {!isMaterial && <Tab label="Component" className={classes.miniTab} />}
                        {!isMaterial && <Tab label="About" className={classes.miniTab} />}
                    </Tabs>
                </div>
                <div className={clsx(classes.usageBox, themedClassName)}>
                    {activeTab === 2 && isMaterial && setActiveTab(1)}
                    {activeTab === 3 && isMaterial && setActiveTab(1)}
                    {activeTab === 0 && getTabContent(0)}
                    {activeTab === 1 && getTabContent(1)}
                    {activeTab === 2 && getTabContent(2)}
                    {activeTab === 3 && getTabContent(3)}
                </div>
                <AccordionActions>
                    <Button variant="contained" color="inherit" onClick={(): void => props.onClose()}>
                        Close
                    </Button>
                    {isMaterial && (
                        <Button
                            variant="contained"
                            color="primary"
                            target="_blank"
                            href={`https://material.io/tools/icons/?icon=${getSnakeCase(name)}&style=baseline`}
                        >
                            Open in Material.io
                        </Button>
                    )}
                </AccordionActions>
            </Accordion>
        </div>
    );
};
