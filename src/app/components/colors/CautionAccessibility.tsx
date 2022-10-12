import React from 'react';
import { ListItemTag } from '@brightlayer-ui/react-components';
import { useTheme } from '@material-ui/core';
import color from 'color';

export const CautionAccessibility: React.FC = () => {
    const theme = useTheme();
    const mainColor = theme.palette.warning.main;
    return (
        <ListItemTag
            label={'Caution'}
            title={'See below'}
            style={{ margin: `${theme.spacing()}px 0 ${theme.spacing(0.5)}px` }}
            fontColor={theme.palette.type === 'light' ? theme.palette.text.primary : mainColor}
            backgroundColor={theme.palette.type === 'light' ? mainColor : color(mainColor).fade(0.8).toString()}
        />
    );
};
