import { SvgIconProps } from '@material-ui/core';

export type TODOFIXME = any;
export type FrameworkFilter = 'all' | 'angular' | 'react' | 'ionic' | 'react-native';
export type DetailedIcon = {
    name: string;
    filename: string;
    family: string[];
    style: string;
    tags: string[];
    description: string;
    author: string;
    size: number;
};
export type Icon = {
    name: string;
    isMaterial: boolean;
};
export type MatIconList = {
    [key: string]: (props: SvgIconProps) => JSX.Element;
};
