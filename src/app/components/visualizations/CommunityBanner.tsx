import React from 'react';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import InfoIcon from '@mui/icons-material/Info';
import { COMMUNITY_DOCS_URL } from '../../../__configuration__/visualizations';

/**
 * A page header banner that clarifies the data visualization content is maintained by the
 * Brightlayer UI community and is not part of an official Brightlayer UI package. It also
 * surfaces a link to the Brightlayer UI Community Docs for discoverability.
 */
export const CommunityBanner: React.FC = () => (
    <Alert
        severity="info"
        icon={<InfoIcon sx={{ fontSize: 24 }} />}
        sx={(theme) => ({
            mt: 1,
            mb: 3,
            p: '20px',
            borderRadius: '8px',
            backgroundColor: `rgba(${theme.vars!.palette.primary.mainChannel} / 0.12)`,
            color: theme.vars!.palette.text.primary,
            fontSize: '14px',
            lineHeight: 'normal',
            alignItems: 'center',
            '& .MuiAlert-icon': { p: 0, mr: '19px', color: theme.vars!.palette.primary.main },
            '& .MuiAlert-message': { p: 0, fontSize: '14px', lineHeight: 'normal' },
        })}
    >
        This content is built and maintained by the Brightlayer UI community and is not part of an official Brightlayer
        UI package. Explore live examples and source code in the{' '}
        <Link
            href={COMMUNITY_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            underline="always"
            sx={(theme) => ({ color: theme.vars!.palette.primary.main })}
        >
            Brightlayer UI Community Docs
        </Link>
        .
    </Alert>
);
