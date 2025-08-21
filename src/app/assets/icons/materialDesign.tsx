import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const MaterialDesign = (props: SvgIconProps): React.JSX.Element => (
    <SvgIcon viewBox={'0 0 24 24'} {...props}>
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#747474"
        />
        <path d="M19 5H5V19H19V5Z" fill="#C8C8C8" />
        <path d="M5 5H19L12 19L5 5Z" fill="white" />
    </SvgIcon>
);
