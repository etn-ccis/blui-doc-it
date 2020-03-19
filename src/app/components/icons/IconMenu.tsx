import React, { useState, useCallback } from 'react';
import * as AllMaterialIcons from '@material-ui/icons';

// PX Blue Icons and Symbols
import * as MuiIcons from '@pxblue/icons-mui';
import * as PXBColors from '@pxblue/colors';

// Material-UI Components
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
    Tabs,
    Tab,
    Typography,
    ExpansionPanelSummary,
    ExpansionPanel,
    ExpansionPanelActions,
    Button,
    makeStyles,
    Theme,
} from '@material-ui/core';
import meta from '@pxblue/icons-mui/index.json';
import { ExternalLink } from '../../../__configuration__/markdown/markdownMapping';
import { unCamelCase, getSnakeCase } from '../../shared/utilities';
import { IconCard } from './IconCard';
import { Icon, MatIconList } from '../../../__types__';

const useStyles = makeStyles((theme: Theme): any => ({
    usageBox: {
        padding: `10px ${theme.spacing(2)}px 0px ${theme.spacing(2)}px`,
        overflowX: 'auto',
        wordWrap: 'noWrap',
        height: '230px',
        overflowY: 'hidden',
    },
    iconSheet: {
        color: PXBColors.black[900],
        width: '100%',
        left: '0px',
        right: '0px',
        bottom: '0px',
        zIndex: '2',
        position: 'fixed',
        marginLeft: 'auto',
        marginRight: 'auto',
        outline: 'none',
        [theme.breakpoints.up('md')]: {
            left: '364px',
            width: '600px',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    aboutPage: {
        padding: '5px',
        backgroundColor: 'inherit',
        whiteSpace: 'pre-wrap',
    },
    miniTab: {
        minWidth: '50px',
    },
}));

const instructionLinks = [
    'https://github.com/pxblue/icons',
    'https://www.npmjs.com/package/@pxblue/icons-svg',
    'https://www.npmjs.com/package/@pxblue/icons-mui',
    'https://material-ui.com/components/icons/#svg-icons',
    'https://material-ui.com/components/icons/#font-icons',
    'https://material.angular.io/components/icon/overview#font-icons-with-ligatures',
    'https://material.angular.io/components/icon/overview#svg-icons',
];

const getIconFile = (iconName: string): any => {
    for (let i = 0; i < meta.icons.length; i++) {
        if (meta.icons[i].filename.includes(iconName)) {
            return meta.icons[i];
        }
    }
    return -1;
};

const getMuiIconName = (filename: string): string =>
    filename.replace(/\.svg/, '').replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());

type IconMenuProps = {
    onClose: Function;
    open: boolean;
    icon: Icon;
};

export const IconMenu: React.FC<IconMenuProps> = (props): JSX.Element => {
    const [activeTab, setActiveTab] = useState(0);
    const MaterialIcons: MatIconList = AllMaterialIcons;
    const Icons: MatIconList = MuiIcons;
    const isMaterial = props.icon.isMaterial;
    const name = props.icon.name;
    const classes: any = useStyles(props);
    const { open } = props;
    const iconData = getIconFile(name);

    const getTabContent = useCallback((tab: number): JSX.Element | null => {
        switch (tab) {
            case 0:
                return (
                    <>
                        {isMaterial && (
                            <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                View detailed usage and installation instructions for{' '}
                                <ExternalLink href={instructionLinks[4]}>React</ExternalLink> and{' '}
                                <ExternalLink href={instructionLinks[5]}>Angular</ExternalLink>.
                            </Typography>
                        )}
                        {!isMaterial && (
                            <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                For detailed usage and installation instructions, visit our{' '}
                                <ExternalLink href={instructionLinks[0]}>GitHub</ExternalLink>.
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
                    </>
                );
            case 1:
                return (
                    <>
                        {isMaterial && (
                            <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                View detailed usage and installation instructions for{' '}
                                <ExternalLink href={instructionLinks[3]}>React</ExternalLink> and{' '}
                                <ExternalLink href={instructionLinks[6]}>Angular</ExternalLink>.
                            </Typography>
                        )}
                        {!isMaterial && (
                            <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                For detailed usage and installation instructions, visit our{' '}
                                <ExternalLink href={instructionLinks[1]}>GitHub</ExternalLink>.
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
                    </>
                );
            case 2:
                return (
                    <>
                        {!isMaterial && (
                            <Typography color={'inherit'} style={{ marginBottom: '10px' }} variant="subtitle2">
                                For detailed usage and installation instructions, visit our{' '}
                                <ExternalLink href={instructionLinks[2]}>GitHub</ExternalLink>.
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
                            Angular
                        </Typography>
                        <Typography color={'inherit'} variant="subtitle2">
                            Icon components are intended for use only in React applications. For a way to link svg icons
                            for use in Angular applications, see{' '}
                            <ExternalLink href={'https://github.com/pxblue/icons/tree/master/svg#angular-1'}>
                                @pxblue/icons
                            </ExternalLink>
                            .
                        </Typography>
                    </>
                );

            case 3:
                return (
                    <>
                        {!isMaterial && (
                            <div className={classes.aboutPage}>
                                <Typography color={'inherit'} variant="subtitle1">
                                    <b>Filename</b>: {iconData.filename}
                                </Typography>
                                <Typography color={'inherit'} variant="subtitle1">
                                    <b>Family</b>: {iconData.family.toString()}
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
    }, []);

    return (
        <div className={classes.iconSheet} hidden={!open}>
            <ExpansionPanel square defaultExpanded={true} elevation={16}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandLessIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
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
                </ExpansionPanelSummary>
                <div style={{ width: 'auto' }}>
                    <Tabs
                        style={{ marginTop: '0px', marginLeft: '0px' }}
                        value={activeTab}
                        onChange={(event: any, newTab: any): any => setActiveTab(newTab)}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Icon Font" className={classes.miniTab} />
                        <Tab label="SVG" className={classes.miniTab} />
                        {!isMaterial && <Tab label="Component" className={classes.miniTab} />}
                        {!isMaterial && <Tab label="About" className={classes.miniTab} />}
                    </Tabs>
                </div>
                <div className={classes.usageBox}>
                    {activeTab === 2 && isMaterial && setActiveTab(1)}
                    {activeTab === 3 && isMaterial && setActiveTab(1)}
                    {activeTab === 0 && getTabContent(0)}
                    {activeTab === 1 && getTabContent(1)}
                    {activeTab === 2 && getTabContent(2)}
                    {activeTab === 3 && getTabContent(3)}
                </div>
                <ExpansionPanelActions>
                    <Button variant="contained" color="inherit" onClick={(): any => props.onClose()}>
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
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    );
};
