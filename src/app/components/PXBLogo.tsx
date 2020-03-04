import React from 'react';
import { Typography } from '@material-ui/core';
import pxb from '../assets/pxb.svg';

export const PXBLogo: React.FC = (): JSX.Element => (
    <>
        <img src={pxb} className={'rotateMe'} alt={'Rotating PX Blue logo'} />
        <Typography variant={'h3'} align={'center'} style={{ fontWeight: 300 }}>
            Power Xpert <b>Blue</b>
        </Typography>
        <Typography align={'center'}>Powering Teams to Make What Matters*</Typography>
    </>
);
PXBLogo.displayName = 'PXBLogo';
