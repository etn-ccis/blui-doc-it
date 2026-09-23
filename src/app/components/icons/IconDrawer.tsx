import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useTheme, Theme, createTheme, ThemeProvider } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { EmptyState, Spacer } from '@brightlayer-ui/react-components';

import { GetApp, Close } from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material';
import * as BLUIIcons from '@brightlayer-ui/icons-mui';
import { Pxblue, TwoToneIcon, type TwoToneStatus } from '@brightlayer-ui/icons-mui';

import { snakeToTitleCase } from '../../shared';
import { emptyIcon } from '.';
import { downloadPng, downloadSvg, createDownloadElement } from './utilityFunctions';

import * as Colors from '@brightlayer-ui/colors';
import { DeveloperInstructionsPanel } from './DeveloperInstructions';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';
import { getScheduledSiteConfig } from '../../../__configuration__/themes';
import { useAppDispatch, useAppSelector, toggleSidebar, RootState } from '../../redux';
import { CopyToClipboard } from './CopyToClipboardButton';
import { IconSize, IconColor } from '../../../__types__';
import { usePrevious } from '../../hooks/usePrevious';
import { SystemStyleObject } from '@mui/system';

const styles: Record<string, SystemStyleObject<Theme>> = {
    drawer: {
        maxWidth: '80%',
        width: 350,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 900,
        backgroundColor: 'background.paper',
    },
    appBar: {
        backgroundColor: Colors.black[500],
        px: { xs: 2, sm: 2 },
        '&.mid-autumn-festival': {
            color: Colors.black[50],
        },
        '&.christmas-eve': {
            color: Colors.white[50],
        },
    },
    appBarCloseButton: {
        color: Colors.white[50],
    },
    formControl: {
        pt: 1,
        pb: 2,
        mr: 2,
        minWidth: 120,
    },
};

type DrawerColor = 'black' | 'white' | TwoToneStatus;

const STATUS_OPTIONS: Array<{ value: TwoToneStatus; label: string }> = [
    { value: 'primary', label: 'Primary (Blue)' },
    { value: 'error', label: 'Error (Red)' },
    { value: 'warning', label: 'Warning (Yellow)' },
    { value: 'success', label: 'Success (Green)' },
    { value: 'orange', label: 'Orange' },
    { value: 'purple', label: 'Purple' },
    { value: 'neutral', label: 'Neutral (Grayscale)' },
];

const isStatusColor = (color: DrawerColor): color is TwoToneStatus => color !== 'black' && color !== 'white';

export const IconDrawer: React.FC = () => {
    const { selectedIcon = emptyIcon } = useSelectedIcon();
    const previousSelectedIcon = usePrevious(selectedIcon);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [iconSize, setIconSize] = React.useState<IconSize>(24);
    const [iconColor, setIconColor] = React.useState<DrawerColor>('black');
    const [previewMode, setPreviewMode] = React.useState<'light' | 'dark'>('light');
    const previewRef = React.useRef<HTMLDivElement>(null);
    const drawerOpen = useAppSelector((state: RootState) => state.app.sidebarOpen);
    const selectedTheme = useAppSelector((state: RootState) => state.app.theme);
    const sm = useMediaQuery(theme.breakpoints.down('md'));
    const themeConfig = getScheduledSiteConfig(selectedTheme);
    const showBanner = useAppSelector((state: RootState) => state.app.showBanner);
    const iconTitle = snakeToTitleCase(selectedIcon.iconFontKey);

    const twoToneKey = `${selectedIcon.name}TwoTone`;
    const TwoToneVariant = (
        selectedIcon.isMaterial
            ? (MuiIcons as unknown as Record<string, React.ComponentType<SvgIconProps>>)[twoToneKey]
            : (BLUIIcons as unknown as Record<string, React.ComponentType<SvgIconProps>>)[twoToneKey]
    ) as React.ComponentType<SvgIconProps> | undefined;
    const hasTwoTone = Boolean(TwoToneVariant);

    const closeDrawer = (): void => {
        void navigate(`${location.pathname}`, { replace: true });
        dispatch(toggleSidebar(false));
    };

    useEffect(() => {
        if (previousSelectedIcon && previousSelectedIcon.isMaterial !== selectedIcon.isMaterial) {
            if (![24, 48].includes(iconSize)) {
                setIconSize(24 as IconSize);
            }
        }
        if (isStatusColor(iconColor) && !hasTwoTone) {
            setIconColor('black');
        }
    }, [selectedIcon]);

    const buildStyledSvgString = (): string | undefined => {
        const svgEl = previewRef.current?.querySelector('svg');
        if (!svgEl) return undefined;
        const clone = svgEl.cloneNode(true) as SVGSVGElement;
        const originals = svgEl.querySelectorAll('*');
        const clones = clone.querySelectorAll('*');
        originals.forEach((orig, i) => {
            const computed = window.getComputedStyle(orig);
            const target = clones[i] as SVGElement;
            if (computed.fill && computed.fill !== 'none') target.setAttribute('fill', computed.fill);
            if (computed.fillOpacity) target.setAttribute('fill-opacity', computed.fillOpacity);
            target.removeAttribute('class');
        });
        clone.removeAttribute('class');
        clone.setAttribute('width', String(iconSize));
        clone.setAttribute('height', String(iconSize));
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return new XMLSerializer().serializeToString(clone);
    };

    const handleSvgDownload = (): void => {
        if (isStatusColor(iconColor)) {
            const svgStr = buildStyledSvgString();
            if (!svgStr) return;
            const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;
            createDownloadElement(url, `${selectedIcon.iconFontKey}_${iconColor}_${previewMode}.svg`);
        } else {
            void downloadSvg(selectedIcon, iconColor as IconColor, iconSize);
        }
    };

    const handlePngDownload = (): void => {
        if (isStatusColor(iconColor)) {
            const svgStr = buildStyledSvgString();
            if (!svgStr) return;
            const img = new Image();
            img.onload = (): void => {
                const canvas = document.createElement('canvas');
                canvas.width = iconSize;
                canvas.height = iconSize;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                ctx.drawImage(img, 0, 0, iconSize, iconSize);
                canvas.toBlob((blob) => {
                    if (!blob) return;
                    createDownloadElement(
                        URL.createObjectURL(blob),
                        `${selectedIcon.iconFontKey}_${iconColor}_${previewMode}.png`
                    );
                });
            };
            img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgStr)))}`;
        } else {
            downloadPng(selectedIcon, iconColor as IconColor, iconSize);
        }
    };

    return (
        <MuiDrawer
            anchor={'right'}
            variant={sm ? 'temporary' : 'persistent'}
            open={drawerOpen}
            onClose={closeDrawer}
            PaperProps={{
                sx: [styles.drawer, showBanner && !sm ? { top: 64 } : {}],
            }}
        >
            <AppBar position="static" color="primary">
                <Toolbar sx={styles.appBar} className={themeConfig.className}>
                    <Typography variant="h6" color="inherit" noWrap>
                        Selected Icon
                    </Typography>
                    <Spacer />
                    <IconButton
                        size={'large'}
                        edge={'end'}
                        onClick={closeDrawer}
                        sx={[{ color: 'common.white' }, showBanner && !sm ? { mr: 1.5 } : {}]}
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px', overflowY: 'auto' }}>
                {selectedIcon.name === '' && (
                    <EmptyState
                        icon={<Pxblue fontSize={'inherit'} />}
                        title={'No Icon Selected'}
                        description={'Select a icon on the left to download or view usage details'}
                        sx={{ p: 3 }}
                    />
                )}
                {selectedIcon.name !== '' && (
                    <>
                        <Stack direction={'row'} alignItems={'center'} sx={{ p: 2 }}>
                            <Box
                                ref={previewRef}
                                sx={{
                                    display: 'inline-flex',
                                    p: 1,
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    bgcolor: previewMode === 'dark' ? Colors.black[900] : Colors.white[50],
                                }}
                            >
                                {isStatusColor(iconColor) && TwoToneVariant ? (
                                    <ThemeProvider theme={createTheme({ palette: { mode: previewMode } })}>
                                        <TwoToneIcon icon={TwoToneVariant} status={iconColor} sx={{ fontSize: 40 }} />
                                    </ThemeProvider>
                                ) : (
                                    <selectedIcon.Icon
                                        sx={{
                                            fontSize: 40,
                                            color: iconColor === 'white' ? Colors.white[50] : Colors.black[500],
                                        }}
                                    />
                                )}
                            </Box>
                            <ListItemText
                                sx={{ ml: 3, my: 0 }}
                                disableTypography
                                primary={
                                    <Stack direction={'row'} alignItems={'center'}>
                                        <Typography variant={'body1'}>{iconTitle}</Typography>
                                        <CopyToClipboard title={'Copy Icon Name'} copyText={iconTitle} sx={{ ml: 1 }} />
                                    </Stack>
                                }
                                secondary={
                                    <Typography variant={'caption'}>
                                        {selectedIcon.isMaterial ? 'Material Icon' : 'Brightlayer UI Icon'}
                                    </Typography>
                                }
                            />
                        </Stack>
                        <Divider />
                        {selectedIcon.tags.length > 0 && (
                            <>
                                <Box sx={{ p: 2 }}>
                                    <Typography display={'block'} variant={'overline'} sx={{ mb: 1 }}>
                                        TAGS / KEYWORDS
                                    </Typography>
                                    <Box component={'code'} sx={{ display: 'block', whiteSpace: 'normal', p: 1 }}>
                                        {selectedIcon.tags.join(', ')}
                                    </Box>
                                </Box>
                                <Divider />
                            </>
                        )}
                        <Box sx={{ p: 2 }}>
                            <Typography display={'block'} variant={'overline'} color={'primary'} sx={{ mb: 1 }}>
                                Download
                            </Typography>
                            <Box>
                                <FormControl sx={styles.formControl}>
                                    <InputLabel variant={'standard'} id="icon-size-select-label">
                                        Select a Size:
                                    </InputLabel>
                                    <Select
                                        labelId="icon-size-select-label"
                                        id="icon-size-select"
                                        variant={'standard'}
                                        value={iconSize}
                                        onChange={(e): void => setIconSize(e.target.value as IconSize)}
                                    >
                                        {selectedIcon.isMaterial && <MenuItem value={18}>18dp</MenuItem>}
                                        <MenuItem value={24}>24dp</MenuItem>
                                        {selectedIcon.isMaterial && <MenuItem value={36}>36dp</MenuItem>}
                                        <MenuItem value={48}>48dp</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={styles.formControl}>
                                    <InputLabel variant={'standard'} id="icon-color-select-label">
                                        Select a Color:
                                    </InputLabel>
                                    <Select
                                        labelId="icon-color-select-label"
                                        id="icon-color-select"
                                        variant={'standard'}
                                        value={iconColor}
                                        onChange={(e): void => setIconColor(e.target.value as DrawerColor)}
                                    >
                                        <MenuItem value={'black'}>Black</MenuItem>
                                        <MenuItem value={'white'}>White</MenuItem>
                                        {hasTwoTone &&
                                            STATUS_OPTIONS.map((opt) => (
                                                <MenuItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={styles.formControl}>
                                    <Typography variant={'caption'} color={'text.secondary'} sx={{ mb: 0.5 }}>
                                        Preview Theme:
                                    </Typography>
                                    <ToggleButtonGroup
                                        size={'small'}
                                        exclusive
                                        value={previewMode}
                                        onChange={(_e, value): void => {
                                            if (value) setPreviewMode(value as 'light' | 'dark');
                                        }}
                                    >
                                        <ToggleButton value={'light'}>Light</ToggleButton>
                                        <ToggleButton value={'dark'}>Dark</ToggleButton>
                                    </ToggleButtonGroup>
                                </FormControl>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mr: 1 }}
                                    startIcon={<GetApp />}
                                    onClick={handleSvgDownload}
                                >
                                    SVG
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handlePngDownload}
                                    startIcon={<GetApp />}
                                >
                                    PNG
                                </Button>
                            </Box>
                        </Box>
                        <Divider />

                        <DeveloperInstructionsPanel status={isStatusColor(iconColor) ? iconColor : undefined} />

                        <Box sx={{ p: 2 }}>
                            <Typography variant={'subtitle2'} align={'center'}>
                                For detailed usage and installation instructions, visit our{' '}
                                <Link href={'https://github.com/etn-ccis/blui-icons'} target={'_blank'}>
                                    Github
                                </Link>
                                .
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </MuiDrawer>
    );
};
