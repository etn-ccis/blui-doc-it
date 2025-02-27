import React, { useState } from 'react';
import { IconType } from '../../../__types__';
import { Theme, SxProps } from '@mui/system';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';

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

const styles: Record<string, SxProps<Theme>> = {
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
        backgroundColor: 'unset',
        backgroundImage: 'unset',
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
                {/* ICON COMPONENT */}
                {framework === 'react' && (
                    <>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant={'overline'}>Icon Components (Recommended)</Typography>
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
