import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Dashboard } from '@mui/icons-material';
import { Device, MapMarkerThree } from '@brightlayer-ui/icons-mui';

export const BottomNavigationDemo: JSX.Element = (
    <BottomNavigation value={0} showLabels style={{ maxWidth: 400, width: '100%', margin: 16 }}>
        <BottomNavigationAction label={'Overview'} icon={<Dashboard />} />
        <BottomNavigationAction label={'Assets'} icon={<Device />} />
        <BottomNavigationAction label={'Locations'} icon={<MapMarkerThree />} />
    </BottomNavigation>
);
