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

export const SmallPXBLogo: React.FC = (): JSX.Element => (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <img src={pxb} height={32} width={'auto'} alt={'PX Blue logo'} />
        <Typography variant={'h5'} style={{ fontWeight: 300, marginLeft: 8 }}>
            Power Xpert <b>Blue</b>
        </Typography>
    </div>
);
PXBLogo.displayName = 'PXBLogo';
