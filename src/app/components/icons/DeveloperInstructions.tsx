import React, { useState } from 'react';
import { IconType } from '../../../__types__';
import {
    Theme,
    Typography,
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionProps,
    Divider,
    SxProps,
    Box,
} from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import { titleCase } from '../../shared';
import { emptyIcon } from '.';

import {
    getIconComponentSnippet,
    getIconComponentCopyText,
    getIconFontSnippet,
    getIconFontCopyText,
    getIconSvgSnippet,
    getIconSvgCopyText,
} from './utilityFunctions';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';
import { CopyToClipboard } from './CopyToClipboardButton';

type Framework = 'angular' | 'react' | 'react-native';

const styles: { [key: string]: SxProps<Theme> } = {
    codeSnippetTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    codeSnippet: {
        mt: 0.5,
        mx: 0,
        mb: 2,
        whiteSpace: 'normal',
    },
    expandIcon: {
        color: 'text.secondary',
    },
    expanded: {},
    accordion: {
        boxShadow: 'none',
        transition: `border 0ms`,
        // TODO: Fix this style
        '&$expanded': {
            m: 0,
            borderLeft: `solid 6px`,
            borderLeftColor: 'primary.main',
        },
        '&:before': {
            opacity: 0,
        },
    },
    accordionDetails: {
        pr: 2,
        pl: 1.25,
        display: 'flex',
        flexDirection: 'column',
    },
    accordionSummary: {
        height: 48,
        minHeight: '48px!important',
        // TODO: fix this style
        '&$expanded': {
            pl: 1.25,
        },
    },
};

export type DeveloperAccordionProps = Omit<AccordionProps, 'children'> & {
    framework: Framework;
    icon: IconType;
};
export const DeveloperInstructionAccordion: React.FC<DeveloperAccordionProps> = (props) => {
    const { framework, icon } = props;

    return (
        <Accordion {...props}>
            <AccordionSummary expandIcon={<ArrowDropDown sx={styles.expandIcon} />} disableRipple>
                <Typography variant={props.expanded ? 'subtitle2' : 'body2'}>{titleCase(framework)}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={styles.accordionDetails}>
                {/* ICON FONT */}
                {(framework === 'angular' || framework === 'react') && (
                    <>
                        <Box sx={styles.codeSnippetTitle}>
                            <Typography variant={'overline'}>Icon Font</Typography>
                            <CopyToClipboard copyText={getIconFontCopyText(framework, icon)} copiedPosition={'left'} />
                        </Box>
                        <Box component={'pre'} sx={styles.codeSnippet}>
                            {getIconFontSnippet(framework, icon)}
                        </Box>
                    </>
                )}

                {/* SVG ICONS */}
                {(framework === 'angular' ||
                    framework === 'react-native' ||
                    (framework === 'react' && !icon.isMaterial)) && (
                    <>
                        <Box sx={styles.codeSnippetTitle}>
                            <Typography variant={'overline'}>SVG</Typography>
                            <CopyToClipboard copyText={getIconSvgCopyText(framework, icon)} copiedPosition={'left'} />
                        </Box>
                        <Box component={'pre'} sx={styles.codeSnippet}>
                            {getIconSvgSnippet(framework, icon)}
                        </Box>
                    </>
                )}

                {/* ICON COMPONENT */}
                {framework === 'react' && (
                    <>
                        <Box sx={styles.codeSnippetTitle}>
                            <Typography variant={'overline'}>Icon Components</Typography>
                            <CopyToClipboard
                                copyText={getIconComponentCopyText(framework, icon)}
                                copiedPosition={'left'}
                            />
                        </Box>
                        <Box component={'pre'} sx={styles.codeSnippet}>
                            {getIconComponentSnippet(framework, icon)}
                        </Box>
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
