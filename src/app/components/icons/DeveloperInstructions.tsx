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
    Stack,
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
    codeSnippet: {
        mt: 0.5,
        mx: 0,
        mb: 2,
        whiteSpace: 'normal',
    },
    accordion: {
        boxShadow: 'none',
        transition: `border 0ms`,
        borderLeft: '6px solid',
        borderLeftColor: 'transparent',
        '&.Mui-expanded': {
            m: 0,
            borderLeftColor: 'primary.main',
            '& .MuiAccordionSummary-root': {
                pl: 1.25,
            },
        },
        '&:before': {
            opacity: 0,
        },
    },
    accordionSummary: {
        height: 48,
        minHeight: '48px!important',
        pl: 1.25,
    },
};

export type DeveloperAccordionProps = Omit<AccordionProps, 'children'> & {
    framework: Framework;
    icon: IconType;
};
export const DeveloperInstructionAccordion: React.FC<DeveloperAccordionProps> = (props) => {
    const { framework, icon } = props;

    return (
        <Accordion square {...props} sx={[styles.accordion, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}>
            <AccordionSummary
                expandIcon={<ArrowDropDown sx={{ color: 'text.secondary' }} />}
                disableRipple
                sx={styles.accordionSummary}
            >
                <Typography variant={props.expanded ? 'subtitle2' : 'body2'}>{titleCase(framework)}</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    pr: 2,
                    pl: 1.25,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* ICON FONT */}
                {(framework === 'angular' || framework === 'react') && (
                    <>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant={'overline'}>Icon Font</Typography>
                            <CopyToClipboard copyText={getIconFontCopyText(framework, icon)} copiedPosition={'left'} />
                        </Stack>
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant={'overline'}>SVG</Typography>
                            <CopyToClipboard copyText={getIconSvgCopyText(framework, icon)} copiedPosition={'left'} />
                        </Stack>
                        <Box component={'pre'} sx={styles.codeSnippet}>
                            {getIconSvgSnippet(framework, icon)}
                        </Box>
                    </>
                )}

                {/* ICON COMPONENT */}
                {framework === 'react' && (
                    <>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant={'overline'}>Icon Components</Typography>
                            <CopyToClipboard
                                copyText={getIconComponentCopyText(framework, icon)}
                                copiedPosition={'left'}
                            />
                        </Stack>
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
