import { SvgIconProps } from '@material-ui/core';

export type TODOFIXME = any;
export type FrameworkFilter = 'all' | 'angular' | 'react' | 'ionic' | 'react-native';
export type Icon = {
    name: string;
    isMaterial: boolean;
};
export type MatIconList = {
    [key: string]: (props: SvgIconProps) => JSX.Element;
};
