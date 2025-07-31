import React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeColorFormat } from '../../redux';

export const Picker = (): JSX.Element => {
    const dispatch = useAppDispatch();
    // @ts-ignore
    const value = useAppSelector((state): 'rgb' | 'hex' => state.app.colorFormat);
    return (
        <div style={{ flex: '0 0 auto' }}>
            RGB
            <Switch
                checked={value === 'hex'}
                onChange={(
                    e
                ): {
                    type: string;
                    payload: string;
                } => dispatch(changeColorFormat(e.target.checked ? 'hex' : 'rgb'))}
            />
            HEX
        </div>
    );
};

export const HeadlineWithToggle = (): JSX.Element => (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }} className={'markdownH1'}>
        <Typography variant={'h4'} color={'primary'} style={{ flex: '1 1 auto' }}>
            Brightlayer UI Color Palette
        </Typography>
        <Picker />
    </div>
);
