import React from 'react';
import externalLinks, { ExternalLink } from '../../../__configuration__/landingPage/externalLinks';
import { LockedBehindEatonFirewall } from './LockedBehindEatonFirewall';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

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

export const ListOfExternalLinks = (): React.JSX.Element => (
    <List sx={{ maxWidth: 400 }}>
        {externalLinks.map((externalLink, index) => (
            <ExternalLinkItem externalLink={externalLink} key={index} divider disableGutters />
        ))}
    </List>
);
