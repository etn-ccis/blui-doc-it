import React from 'react';
import externalLinks, { ExternalLink } from '../../../__configuration__/landingPage/externalLinks';
import { ListItem, ListItemText, Tooltip, List } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const ExternalLinkItem = (externalLink: ExternalLink, disableGutters = false, divider = false): JSX.Element => (
    <ListItem
        dense
        divider={divider}
        disableGutters={disableGutters}
        secondaryAction={
            externalLink.loginRequired ? (
                <Tooltip title={`Requires login with Eaton credentials`}>
                    <LockOpenIcon fontSize={'small'} color={`disabled`} />
                </Tooltip>
            ) : undefined
        }
    >
        <ListItemText primary={externalLink.title} secondary={externalLink.subtitle} />
    </ListItem>
);

export const ListOfExternalLinks = (): JSX.Element => (
    <List sx={{ maxWidth: 400 }}>
        {externalLinks.map((externalLink, index) => (
            <a
                href={externalLink.link}
                target={`_blank`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                key={index}
            >
                {ExternalLinkItem(externalLink, true, true)}
            </a>
        ))}
    </List>
);
