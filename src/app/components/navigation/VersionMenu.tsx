import React, { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Check from '@mui/icons-material/Check';
import { type VersionHistoryItem } from '../../../__configuration__/navigationMenu/versionHistory';

const docsBaseUrl = (process.env.PUBLIC_URL || '').replace(/\/v\d+$/, '').replace(/\/$/, '');
const snapshotUrl = /\/v\d+$/.exec(process.env.PUBLIC_URL ?? '')?.[0] ?? '';
const getVersionUrl = (item: VersionHistoryItem): string => `${docsBaseUrl}${item.url}/`;

export const VersionMenu = (): React.JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [versionHistory, setVersionHistory] = useState<VersionHistoryItem[]>([]);
    const currentVersion = versionHistory.find((item) => item.url === snapshotUrl) ?? versionHistory[0];

    useEffect(() => {
        const abortController = new AbortController();

        const loadVersionHistory = async (): Promise<void> => {
            try {
                const response = await fetch(`${docsBaseUrl}/version-history.json`, {
                    signal: abortController.signal,
                });
                if (response.ok) {
                    setVersionHistory((await response.json()) as VersionHistoryItem[]);
                }
            } catch {
                // Keep the version control empty while the shared manifest is unavailable.
            }
        };

        void loadVersionHistory();
        return (): void => abortController.abort();
    }, []);

    const handleSelect = (item: VersionHistoryItem): void => {
        setAnchorEl(null);
        if (item.url !== snapshotUrl) {
            window.location.assign(getVersionUrl(item));
        }
    };

    return (
        <>
            <ListItemButton onClick={(e): void => setAnchorEl(e.currentTarget)} sx={{ gap: 1, px: 2, py: 1.5 }}>
                <ListItemText primary={'Version'} secondary={currentVersion?.label} />
                <ChevronRight fontSize={'small'} />
            </ListItemButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={(): void => setAnchorEl(null)}>
                {versionHistory.map((item) => (
                    <MenuItem
                        key={item.label}
                        selected={item.url === snapshotUrl}
                        onClick={(): void => handleSelect(item)}
                        sx={{ gap: 3, minWidth: 260 }}
                    >
                        <ListItemText primary={item.label} secondary={`${item.release}, ${item.date}`} />
                        {item.url === snapshotUrl && (
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
