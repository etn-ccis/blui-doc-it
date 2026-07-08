import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import { Spacer } from '@brightlayer-ui/react-components';
import { Menu, Notifications, Search } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

/*
 * App Bar demo showing a primary AppBar and a transparent AppBar with Tabs.
 */
export const AppBarDemo: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack
            justifyContent={'center'}
            sx={{
                p: 2,
                width: '100%',
                minHeight: 400,
            }}
        >
            <AppBar position={'static'} key={'primary'} color={'primary'} sx={{ zIndex: 0 }}>
                <Toolbar sx={{ px: { xs: 2, sm: 2 } }}>
                    <IconButton size={'large'} edge={'start'} color={'inherit'} sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <ListItemText
                        primary={'Primary'}
                        secondary={'This is the App Bar pinned to the top'}
                        secondaryTypographyProps={{ sx: { color: 'inherit' } }}
                    />
                    <Spacer />
                    <IconButton color={'inherit'}>
                        <Search />
                    </IconButton>
                    <IconButton color={'inherit'} sx={{ mr: 1.5 }}>
                        <Badge badgeContent={3} color={'error'}>
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <Avatar />
                </Toolbar>
            </AppBar>

            <AppBar position={'static'} key={'secondary'} color={'transparent'} sx={{ zIndex: 0 }}>
                <Tabs
                    value={0}
                    sx={{
                        '& .MuiTabs-indicator': { backgroundColor: theme.palette.primary.main },
                        '& .MuiTab-root': { color: theme.palette.text.primary },
                        '& .MuiTab-root.Mui-selected': { color: theme.palette.primary.main },
                    }}
                >
                    <Tab value={0} label={'Secondary'} />
                    <Tab value={1} label={'App Bar'} />
                    <Tab value={2} label={'with Tabs'} />
                </Tabs>
            </AppBar>
        </Stack>
    );
};
