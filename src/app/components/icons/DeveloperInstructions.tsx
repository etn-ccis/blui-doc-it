import React, { useState } from 'react';
import { IconType } from '../../../__types__';
import {
    Theme,
    Tooltip,
    Typography,
    useTheme,
    withStyles,
    makeStyles,
    Accordion as MuiAccordion,
    AccordionSummary as MuiAccordionSummary,
    AccordionDetails as MuiAccordionDetails,
    AccordionProps,
    Divider,
} from '@material-ui/core';

import { ArrowDropDown, FileCopy } from '@material-ui/icons';

import { copyTextToClipboard, titleCase } from '../../shared';
import { emptyIcon } from '.';

import * as Colors from '@pxblue/colors';
import {
    getIconComponentExample,
    getIconComponentInstructions,
    getIconFontExample,
    getIconFontInstructions,
    getIconSvgExample,
    getIconSvgInstructions,
} from './utilityFunctions';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';

type Framework = 'angular' | 'react' | 'react-native';

const useStyles = makeStyles((theme: Theme) => ({
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
    expanded: {},
}));

const Accordion = withStyles((theme: Theme) => ({
    root: {
        boxShadow: 'none',
        transition: `border 0ms`,
        '&$expanded': {
            margin: 0,
            borderLeft: `solid 6px ${theme.palette.primary.main}`,
        },
        '&:before': {
            opacity: 0,
        },
    },
    expanded: {},
}))(MuiAccordion);

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

const AccordionDetails = withStyles(() => ({
    root: {
        padding: '0 16px',
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'column',
    },
}))(MuiAccordionDetails);

export const DeveloperInstructionsPanel: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const { selectedIcon: icon = emptyIcon } = useSelectedIcon();
    const [activeFramework, setActiveFramework] = useState<Framework | undefined>(undefined);
    const frameworks: Framework[] = ['angular', 'react', 'react-native'];

    return (
        <>
            <Typography display={'block'} variant={'overline'} style={{ padding: theme.spacing(2) }}>
                Developer Usage
            </Typography>
            <Divider />
            {frameworks.map((framework) => (
                <React.Fragment key={`instructions_${framework}`}>
                    <DeveloperInstructionAccordion
                        framework={framework}
                        icon={icon}
                        expanded={activeFramework === framework}
                        onChange={(): void => setActiveFramework(activeFramework === framework ? undefined : framework)}
                    />
                    <Divider />
                </React.Fragment>
            ))}
        </>
    );
};

export type DeveloperAccordionProps = Omit<AccordionProps, 'children'> & {
    framework: Framework;
    icon: IconType;
};
export const DeveloperInstructionAccordion: React.FC<DeveloperAccordionProps> = (props) => {
    const { framework, icon } = props;
    const classes = useStyles();
    const [copiedInstructions, setCopiedInstructions] = useState({
        font: false,
        svg: false,
        component: false,
    });

    return (
        <Accordion {...props}>
            <AccordionSummary
                expandIcon={<ArrowDropDown className={classes.expandIcon} />}
                IconButtonProps={{ disableRipple: true }}
            >
                <Typography variant={props.expanded ? 'subtitle2' : 'body2'}>{titleCase(framework)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* ICON FONT */}
                {(framework === 'angular' || framework === 'react') && (
                    <>
                        <div className={classes.codeSnippetTitle}>
                            <Typography variant={'overline'}>Icon Font</Typography>
                            <Tooltip title="Copied" placement="left" open={copiedInstructions.font}>
                                <FileCopy
                                    className={classes.copyIcon}
                                    onClick={(): void => {
                                        copyTextToClipboard(getIconFontInstructions(framework, icon), () => {
                                            setCopiedInstructions({ ...copiedInstructions, font: true });
                                            setTimeout(
                                                () => setCopiedInstructions({ ...copiedInstructions, font: false }),
                                                1000
                                            );
                                        });
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <pre className={classes.codeSnippet}>{getIconFontExample(framework, icon)}</pre>
                    </>
                )}

                {/* SVG ICONS */}
                {(framework === 'angular' ||
                    framework === 'react-native' ||
                    (framework === 'react' && !icon.isMaterial)) && (
                    <>
                        <div className={classes.codeSnippetTitle}>
                            <Typography variant={'overline'}>SVG</Typography>
                            <Tooltip title="Copied" placement="left" open={copiedInstructions.svg}>
                                <FileCopy
                                    className={classes.copyIcon}
                                    onClick={(): void => {
                                        copyTextToClipboard(getIconSvgInstructions(framework, icon), () => {
                                            setCopiedInstructions({ ...copiedInstructions, svg: true });
                                            setTimeout(
                                                () => setCopiedInstructions({ ...copiedInstructions, svg: false }),
                                                1000
                                            );
                                        });
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <pre className={classes.codeSnippet}>{getIconSvgExample(framework, icon)}</pre>
                    </>
                )}

                {/* ICON COMPONENT */}
                {framework === 'react' && (
                    <>
                        <div className={classes.codeSnippetTitle}>
                            <Typography variant={'overline'}>Icon Components</Typography>
                            <Tooltip title="Copied" placement="left" open={copiedInstructions.component}>
                                <FileCopy
                                    className={classes.copyIcon}
                                    onClick={(): void => {
                                        copyTextToClipboard(getIconComponentInstructions(framework, icon), () => {
                                            setCopiedInstructions({ ...copiedInstructions, component: true });
                                            setTimeout(
                                                () =>
                                                    setCopiedInstructions({ ...copiedInstructions, component: false }),
                                                1000
                                            );
                                        });
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <pre className={classes.codeSnippet}>{getIconComponentExample(framework, icon)}</pre>
                    </>
                )}
            </AccordionDetails>
        </Accordion>
    );
};
