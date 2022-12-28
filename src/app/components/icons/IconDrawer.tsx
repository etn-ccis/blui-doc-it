import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Button,
    Divider,
    Drawer as MuiDrawer,
    IconButton,
    Link,
    Theme,
    Toolbar,
    Typography,
    useTheme,
    useMediaQuery,
    Box,
    Stack,
    ListItemText,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { EmptyState, Spacer } from '@brightlayer-ui/react-components';

import { GetApp, Close } from '@mui/icons-material';
import { Pxblue } from '@brightlayer-ui/icons-mui';

import { snakeToTitleCase } from '../../shared';
import { emptyIcon } from '.';
import { downloadPng, downloadSvg } from './utilityFunctions';

import * as Colors from '@brightlayer-ui/colors';
import { DeveloperInstructionsPanel } from './DeveloperInstructions';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';
import { getScheduledSiteConfig } from '../../../__configuration__/themes';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_SIDEBAR } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
import { CopyToClipboard } from './CopyToClipboardButton';
import { IconSize, IconColor } from '../../../__types__';
import { usePrevious } from '../../hooks/usePrevious';
import { SystemStyleObject } from '@mui/system';

const styles: { [key: string]: SystemStyleObject<Theme> } = {
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

export const IconDrawer: React.FC = () => {
    const { selectedIcon = emptyIcon } = useSelectedIcon();
    const previousSelectedIcon = usePrevious(selectedIcon);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [iconSize, setIconSize] = React.useState<IconSize>(24);
    const [iconColor, setIconColor] = React.useState<IconColor>('black');
    const drawerOpen = useSelector((state: AppState) => state.app.sidebarOpen);
    const selectedTheme = useSelector((state: AppState) => state.app.theme);
    const sm = useMediaQuery(theme.breakpoints.down('md'));
    const themeConfig = getScheduledSiteConfig(selectedTheme);
    const showBanner = useSelector((state: AppState) => state.app.showBanner);
    const iconTitle = snakeToTitleCase(selectedIcon.iconFontKey);

    const closeDrawer = (): void => {
        navigate(`${location.pathname}`, { replace: true });
        dispatch({ type: TOGGLE_SIDEBAR, payload: false });
    };

    useEffect(() => {
        if (previousSelectedIcon && previousSelectedIcon.isMaterial !== selectedIcon.isMaterial) {
            if (![24, 48].includes(iconSize)) {
                setIconSize(24 as IconSize);
            }
            if (!['black', 'white'].includes(iconColor)) {
                setIconColor('black' as IconColor);
            }
        }
    }, [selectedIcon]);

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
                            <selectedIcon.Icon sx={{ fontSize: 40 }} />
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
                                        onChange={(e): void => setIconColor(e.target.value as IconColor)}
                                    >
                                        <MenuItem value={'black'}>Black</MenuItem>
                                        <MenuItem value={'white'}>White</MenuItem>
                                        {!selectedIcon.isMaterial && <MenuItem value={'blue'}>Blue</MenuItem>}
                                        {!selectedIcon.isMaterial && <MenuItem value={'gray'}>Gray</MenuItem>}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mr: 1 }}
                                    startIcon={<GetApp />}
                                    onClick={(): void => {
                                        void downloadSvg(selectedIcon, iconColor, iconSize);
                                    }}
                                >
                                    SVG
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(): void => downloadPng(selectedIcon, iconColor, iconSize)}
                                    startIcon={<GetApp />}
                                >
                                    PNG
                                </Button>
                            </Box>
                        </Box>
                        <Divider />

                        <DeveloperInstructionsPanel />

                        <Box sx={{ p: 2 }}>
                            <Typography variant={'subtitle2'} align={'center'}>
                                For detailed usage and installation instructions, visit our{' '}
                                <Link href={'https://github.com/brightlayer-ui/icons'} target={'_blank'}>
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
