import React, { useState } from 'react';
import { IconType } from '../../../__types__';
import {
    Theme,
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

import { ArrowDropDown } from '@material-ui/icons';

import { titleCase } from '../../shared';
import { emptyIcon } from '.';

import * as Colors from '@pxblue/colors';
import {
    getIconComponentSnippet,
    getIconComponentCopyText,
    getIconFamilyCopyText,
    getIconFamilySnippet,
    getIconFontSnippet,
    getIconFontCopyText,
    getIconSvgSnippet,
    getIconSvgCopyText,
} from './utilityFunctions';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';
import { CopyToClipboard } from './CopyToClipboardButton';

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

export type DeveloperAccordionProps = Omit<AccordionProps, 'children'> & {
    framework: Framework;
    icon: IconType;
};
export const DeveloperInstructionAccordion: React.FC<DeveloperAccordionProps> = (props) => {
    const { framework, icon } = props;
    const classes = useStyles();

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
                            <CopyToClipboard copyText={getIconFontCopyText(framework, icon)} copiedPosition={'left'} />
                        </div>
                        <pre className={classes.codeSnippet}>{getIconFontSnippet(framework, icon)}</pre>
                    </>
                )}

                {/* SVG ICONS */}
                {(framework === 'angular' ||
                    framework === 'react-native' ||
                    (framework === 'react' && !icon.isMaterial)) && (
                    <>
                        <div className={classes.codeSnippetTitle}>
                            <Typography variant={'overline'}>SVG</Typography>
                            <CopyToClipboard copyText={getIconSvgCopyText(framework, icon)} copiedPosition={'left'} />
                        </div>
                        <pre className={classes.codeSnippet}>{getIconSvgSnippet(framework, icon)}</pre>
                    </>
                )}

                {/* ICON COMPONENT */}
                {framework === 'react' && (
                    <>
                        <div className={classes.codeSnippetTitle}>
                            <Typography variant={'overline'}>Icon Components</Typography>
                            <CopyToClipboard
                                copyText={getIconComponentCopyText(framework, icon)}
                                copiedPosition={'left'}
                            />
                        </div>
                        <pre className={classes.codeSnippet}>{getIconComponentSnippet(framework, icon)}</pre>
                    </>
                )}
                {/* ICON FAMILY */}
                {framework === 'react-native' && (
                    <>
                        <div className={classes.codeSnippetTitle}>
                            <Typography variant={'overline'}>Icon Family</Typography>
                            <CopyToClipboard
                                copyText={getIconFamilyCopyText(framework, icon)}
                                copiedPosition={'left'}
                            />
                        </div>
                        <pre className={classes.codeSnippet}>{getIconFamilySnippet(framework, icon)}</pre>
                    </>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

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
            {frameworks.map((framework) => (
                <React.Fragment key={`instructions_${framework}`}>
                    <Divider style={{ marginLeft: theme.spacing(2) }} />
                    <DeveloperInstructionAccordion
                        framework={framework}
                        icon={icon}
                        expanded={activeFramework === framework}
                        onChange={(): void => setActiveFramework(activeFramework === framework ? undefined : framework)}
                    />
                </React.Fragment>
            ))}
            <Divider />
        </>
    );
};
