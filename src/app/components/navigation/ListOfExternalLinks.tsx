import React from 'react';
import externalLinks, { ExternalLink } from '../../../__configuration__/landingPage/externalLinks';
import { ListItemButton, ListItemText, Tooltip, List, ListItemButtonProps } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

type ExternalLinkItemProps = ListItemButtonProps & {
    externalLink: ExternalLink;
};

export const ExternalLinkItem: React.FC<ExternalLinkItemProps> = (props) => {
    const { externalLink, ...otherProps } = props;
    return (
        // @ts-ignore
        <ListItemButton component={`a`} href={externalLink.link} sx={{ gap: 2 }} {...otherProps}>
            <ListItemText primary={externalLink.title} secondary={externalLink.subtitle} />
            {externalLink.loginRequired && (
                <Tooltip title={`Requires login with Eaton credentials`}>
                    <LockOpenIcon fontSize={'small'} color={`disabled`} />
                </Tooltip>
            )}
        </ListItemButton>
    );
};

export const ListOfExternalLinks = (): JSX.Element => (
    <List sx={{ maxWidth: 400 }}>
        {externalLinks.map((externalLink, index) => (
            <ExternalLinkItem externalLink={externalLink} key={index} divider disableGutters />
        ))}
    </List>
);
