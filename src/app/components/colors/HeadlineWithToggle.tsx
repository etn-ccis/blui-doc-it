import React from 'react';
import { Switch, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_COLOR_FORMAT } from '../../redux/actions';

export const Picker = (): JSX.Element => {
    const dispatch = useDispatch();
    // @ts-ignore
    const value = useSelector((state): 'rgb' | 'hex' => state.app.colorFormat);
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
                } => dispatch({ type: CHANGE_COLOR_FORMAT, payload: e.target.checked ? 'hex' : 'rgb' })}
            />
            HEX
        </div>
    );
};

export const HeadlineWithToggle = (): JSX.Element => (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
        <Typography variant={'h4'} color={'primary'} style={{ flex: '1 1 auto' }}>
            PX Blue Color Palette
        </Typography>
        <Picker />
    </div>
);
