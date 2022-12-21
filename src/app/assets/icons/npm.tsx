import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const NPM = (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox={'0 0 24 24'} {...props}>
        <path d="M20,4H4V20h8V8h4V20h4V4" />
        <rect width="24" height="24" fill="none" />
    </SvgIcon>
);
