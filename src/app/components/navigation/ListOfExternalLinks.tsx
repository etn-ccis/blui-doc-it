import React from 'react';
import externalLinks, { ExternalLink } from '../../../__configuration__/landingPage/externalLinks';
import { LockedBehindEatonFirewall } from './LockedBehindEatonFirewall';
import { ListItemButton, ListItemText, List, ListItemButtonProps } from '@mui/material';

type ExternalLinkItemProps = ListItemButtonProps & {
    externalLink: ExternalLink;
};

export const ExternalLinkItem: React.FC<ExternalLinkItemProps> = (props) => {
    const { externalLink, ...otherProps } = props;
    return (
        // @ts-ignore
        <ListItemButton component={`a`} href={externalLink.link} sx={{ gap: 2 }} {...otherProps}>
            <ListItemText primary={externalLink.title} secondary={externalLink.subtitle} />
            {externalLink.loginRequired && <LockedBehindEatonFirewall />}
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
