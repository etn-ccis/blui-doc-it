import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import LockOutlined from '@mui/icons-material/LockOutlined';

/**
 * @returns A lock icon that says "Requires login with Eaton credentials"
 */
export const LockedBehindEatonFirewall: React.FC = () => (
    <Tooltip title={`Requires login with Eaton credentials`}>
        <LockOutlined fontSize={'small'} color={`disabled`} />
    </Tooltip>
);
