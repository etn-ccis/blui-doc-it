import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Check from '@mui/icons-material/Check';
import { versionHistory, VersionHistoryItem } from '../../../__configuration__/navigationMenu/versionHistory';

// Determines which snapshot is actually being served by matching the current path against each version's url,
// since each version is a separate static build (not a client-side route).
const getActiveVersion = (): VersionHistoryItem => {
    const { pathname } = window.location;
    const nonRootMatch = versionHistory.find(
        (item) => item.url !== '/' && (pathname === item.url || pathname.startsWith(item.url))
    );
    return nonRootMatch ?? versionHistory.find((item) => item.url === '/') ?? versionHistory[0];
};

export const VersionMenu = (): React.JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const currentVersion = getActiveVersion();

    const handleSelect = (item: VersionHistoryItem): void => {
        setAnchorEl(null);
        if (item.url !== currentVersion.url) {
            // Historical snapshots are separate static builds, so a full navigation is required.
            window.location.href = item.url;
        }
    };

    return (
        <>
            <ListItemButton onClick={(e): void => setAnchorEl(e.currentTarget)} sx={{ gap: 1, px: 2, py: 1.5 }}>
                <ListItemText primary={'Version'} secondary={currentVersion.label} />
                <ChevronRight fontSize={'small'} />
            </ListItemButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={(): void => setAnchorEl(null)}>
                {versionHistory.map((item) => (
                    <MenuItem
                        key={item.label}
                        selected={item.label === currentVersion.label}
                        onClick={(): void => handleSelect(item)}
                        sx={{ gap: 3, minWidth: 260 }}
                    >
                        <ListItemText primary={item.label} secondary={`${item.release}, ${item.date}`} />
                        {item.label === currentVersion.label && (
                            <ListItemIcon sx={{ minWidth: 'auto' }}>
                                <Check fontSize={'small'} color={'primary'} />
                            </ListItemIcon>
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
