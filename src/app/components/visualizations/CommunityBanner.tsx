import React from 'react';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import GroupsIcon from '@mui/icons-material/Groups';
import { COMMUNITY_DOCS_URL } from '../../../__configuration__/visualizations';

/**
 * A page header banner that clarifies the data visualization content is maintained by the
 * Brightlayer UI community and is not part of an official Brightlayer UI package. It also
 * surfaces a link to the Brightlayer UI Community Docs for discoverability.
 */
export const CommunityBanner: React.FC = () => (
    <Alert
        severity="info"
        icon={<GroupsIcon fontSize="inherit" />}
        sx={{ mt: 1, mb: 3, borderRadius: '4px', alignItems: 'center' }}
    >
        This content is built and maintained by the Brightlayer UI community and is not part of an official
        Brightlayer UI package. Explore live examples and source code in the{' '}
        <Link href={COMMUNITY_DOCS_URL} target="_blank" rel="noopener noreferrer" underline="hover">
            Brightlayer UI Community Docs
        </Link>
        .
    </Alert>
);
